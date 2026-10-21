"use server";

import { randomBytes, createHash } from "node:crypto";
import prisma from "@/lib/server/prisma";
import { sendEmail } from "@/services/email.service";
import { verifyEmailTemplate } from "@/services/templates/verifyEmail";
import type { formState } from "@/types/auth-types";

const COOLDOWN_MS = 60 * 1000;
const TOKEN_TTL_MS = 60 * 60 * 1000;

export async function resendVerificationEmail(
  email: string,
): Promise<formState> {
  try {
    if (!email || typeof email !== "string") {
      return { status: "error", message: "Invalid request." };
    }

    const organization = await prisma.organization.findUnique({
      where: { email },
    });

    if (!organization) {
      return {
        status: "error",
        message:
          "We couldn't find an account associated with this verification request. Please check your details and try again.",
      };
    }

    if (organization.emailVerifiedAt) {
      return {
        status: "success",
        message: "Your email address is already verified. You're all set!",
      };
    }

    if (organization.verificationTokenExpiresAt) {
      const lastSentAt =
        organization.verificationTokenExpiresAt.getTime() - TOKEN_TTL_MS;

      if (Date.now() - lastSentAt < COOLDOWN_MS) {
        return {
          status: "error",
          message: "Please wait a minute before requesting another email.",
        };
      }
    }

    const rawToken = randomBytes(32).toString("hex");

    const hashedToken = createHash("sha256").update(rawToken).digest("hex");

    await prisma.organization.update({
      where: { id: organization.id },
      data: {
        verificationToken: hashedToken,
        verificationTokenExpiresAt: new Date(Date.now() + TOKEN_TTL_MS),
      },
    });

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;

    await sendEmail({
      to: organization.email,
      subject: "Verify your email - VoiceWorship",
      html: verifyEmailTemplate(verifyUrl),
    });

    return {
      status: "success",
      message:
        "A new verification email has been sent. Please check your inbox and spam folder.",
    };
  } catch (error) {
    console.error("[resendVerificationEmail] failed:", error);
    return {
      status: "error",
      message: "We couldn't resend the email. Please try again later.",
    };
  }
}
