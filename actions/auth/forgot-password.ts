"use server";

import { cookies } from "next/headers";
import axios from "axios";
import prisma from "@/lib/server/prisma";
import { sendEmail } from "@/services/email.service";
import type { formState } from "@/types/auth-types";
import { passwordResetEmailTemplate } from "@/services/templates/passwordReset";
import { validateForgotPasswordEmail } from "@/util/validations";
import { sendOtp } from "@/services/send-otp";

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

    const result = await sendOtp(user.phoneNumber);

    if (!result.ok) {
      return {
        status: "error",
        message: result.message || "Failed to send OTP. Try again later.",
      };
    }

    if (result.ok) {
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
