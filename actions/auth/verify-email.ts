"use server";

import { createHash } from "node:crypto";
import prisma from "@/lib/server/prisma";
import type { formState } from "@/types/auth-types";
import { sendEmail } from "@/services/email.service";
import { welcomeEmailTemplate } from "@/services/templates/welcome";

export async function verifyEmail(token: string): Promise<formState> {
  try {
    if (!token || typeof token !== "string") {
      return {
        status: "error",
        message: "Your verification link is invalid.",
        errors: {},
      };
    }

    const hashedToken = createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: hashedToken,
      },
    });

    if (!user) {
      return {
        status: "error",
        message: "This verification link is invalid or has already been used.",
        errors: {},
      };
    }

    if (user.emailVerifiedAt) {
      return {
        status: "success",
        message: "Your email has already been verified.",
        errors: {},
      };
    }

    if (
      !user.verificationTokenExpiresAt ||
      user.verificationTokenExpiresAt < new Date()
    ) {
      return {
        status: "error",
        message:
          "Your verification link has expired. Please request a new one.",
        errors: {},
      };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerifiedAt: new Date(),
        verificationToken: null,
        verificationTokenExpiresAt: null,
      },
    });

    await sendEmail({
      to: user.email,
      subject: "VoiceWorship Account Created",
      html: welcomeEmailTemplate({
        firstName: user.firstName,
        organizationName: user.organizationName,
        signInUrl: `${process.env.CLIENT_URL}/auth?mode=signin`,
      }),
    });

    return {
      status: "success",
      message: "Your email has been verified successfully.",
    };
  } catch (error) {
    console.error("[setNewPassword] failed:", error);
    return {
      status: "error",
      message:
        "An error occurred while processing your request. Please try again later.",
    };
  }
}
