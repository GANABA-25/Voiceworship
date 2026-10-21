"use server";

import { cookies } from "next/headers";
import axios from "axios";
import prisma from "@/lib/server/prisma";
import { sendEmail } from "@/services/email.service";
import type { formState } from "@/types/auth-types";
import { passwordResetEmailTemplate } from "@/services/templates/passwordReset";
import { validateForgotPasswordEmail } from "@/util/validations";

export async function forgotPassword(
  previousState: formState,
  formData: FormData,
): Promise<formState> {
  try {
    const resetPasswordEmail = {
      email: formData.get("email") as string,
    };
    const errors = validateForgotPasswordEmail(resetPasswordEmail);

    if (Object.values(errors).some((error) => error !== "")) {
      return {
        status: "error",
        message: "Please fix the errors below",
        errors,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: resetPasswordEmail.email,
      },
    });

    if (!user) {
      return {
        status: "error",
        message: "Invalid email",
      };
    }

    const data = {
      expiry: 5,
      length: 6,
      medium: "sms",
      message:
        "VoiceWorship Password Reset: Your verification code is %otp_code%. This code expires in 5 minutes. Do not share this code with anyone.",
      number: user.phoneNumber,
      sender_id: "VoWorship",
      type: "numeric",
    };

    const headers = {
      "api-key": process.env.ARKESEL_API_KEY,
    };

    const response = await axios.post(
      "https://sms.arkesel.com/api/otp/generate",
      data,
      { headers },
    );

    if (response.data && response.data.code === "1000") {
      try {
        await sendEmail({
          to: user.email,
          subject: "Password reset requested - VoiceWorship",
          html: passwordResetEmailTemplate({
            firstName: user.firstName,
            expiryMinutes: 5,
          }),
        });
      } catch (emailError) {
        console.error("[resetPassword] notification email failed:", emailError);
      }
    } else {
      const errorMessage =
        response.data?.message || "Failed to send OTP. Try again later.";
      return {
        status: "error",
        message: errorMessage,
      };
    }

    (await cookies()).set("reset_email", user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 5,
    });

    return {
      message:
        "We've sent a 6-digit verification code to your phone. Enter it to continue.",
      status: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message:
        "An error occurred while processing your request. Please try again later.",
    };
  }
}
