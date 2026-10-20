"use server";

import jwt from "jsonwebtoken";
import axios from "axios";
import { cookies } from "next/headers";
import prisma from "@/lib/server/prisma";
import { sendEmail } from "@/services/email.service";
import type { formState } from "@/types/auth-types";
import { validateOtpData } from "@/util/validations";

export async function verifyOtp(
  previousState: formState,
  formData: FormData,
): Promise<formState> {
  try {
    const otpData = {
      otp: formData.get("otp") as string,
    };

    const errors = validateOtpData(otpData);

    if (Object.values(errors).some((error) => error !== "")) {
      return {
        status: "error",
        message: "Please fix the errors below",
        errors,
      };
    }

    const email = (await cookies()).get("reset_email")?.value;

    if (!email) {
      return {
        status: "error",
        message: "Your session has expired. Please request a new code.",
      };
    }

    const user = await prisma.organization.findUnique({ where: { email } });

    if (!user) {
      return {
        status: "error",
        message: "",
      };
    }

    const data = {
      api_key: process.env.ARKESEL_API_KEY,
      code: otpData.otp,
      number: user.phoneNumber,
    };

    const headers = {
      "api-key": process.env.ARKESEL_API_KEY,
    };

    const response = await axios.post(
      "https://sms.arkesel.com/api/otp/verify",
      data,
      { headers },
    );

    if (response.data && response.data.code === "1100") {
      const cookieStore = await cookies();

      const resetToken = jwt.sign(
        { id: user.id, purpose: "password-reset" },
        process.env.JWT_SECRET!,
        { expiresIn: "10m" },
      );

      cookieStore.delete("reset_email");

      cookieStore.set("reset_token", resetToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 10,
      });

      return {
        status: "success",
        message:
          "OTP verification successful. You can now reset your password.",
      };
    } else {
      console.error("[verifyOtp] Arkesel response:", response.data);
      return {
        status: "error",
        message: "OTP Code has expired. Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message:
        "An error occurred while processing your request. Please try again later.",
    };
  }
}
