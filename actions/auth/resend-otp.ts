"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/server/prisma";
import { sendOtp } from "@/services/send-otp";

const COOLDOWN_MS = 60 * 1000;

export async function resendOtp(): Promise<{
  status: "success" | "error";
  message: string;
}> {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("reset_email")?.value;

    if (!email) {
      return {
        status: "error",
        message: "Your session has expired. Please start again.",
      };
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { status: "error", message: "Something went wrong. Start again." };
    }

    if (user.otpSentAt && Date.now() - user.otpSentAt.getTime() < COOLDOWN_MS) {
      return {
        status: "error",
        message: "Please wait a moment before requesting another code.",
      };
    }

    const result = await sendOtp(user.phoneNumber);

    if (!result.ok) {
      return { status: "error", message: result.message };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { otpSentAt: new Date() },
    });

    cookieStore.set("reset_email", user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return {
      status: "success",
      message: "A new verification code has been sent.",
    };
  } catch (error) {
    console.error("[resendOtp]", error);
    return {
      status: "error",
      message: "We couldn't resend the code. Please try again.",
    };
  }
}
