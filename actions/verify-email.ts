"use server";

import { createHash } from "node:crypto";
import prisma from "@/lib/server/prisma";
import type { formState } from "@/types/auth-types";

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

    const organization = await prisma.organization.findFirst({
      where: {
        verificationToken: hashedToken,
      },
    });

    if (!organization) {
      return {
        status: "error",
        message: "This verification link is invalid or has already been used.",
        errors: {},
      };
    }

    if (organization.emailVerifiedAt) {
      return {
        status: "success",
        message: "Your email has already been verified.",
        errors: {},
      };
    }

    if (
      !organization.verificationTokenExpiresAt ||
      organization.verificationTokenExpiresAt < new Date()
    ) {
      return {
        status: "error",
        message:
          "Your verification link has expired. Please request a new one.",
        errors: {},
      };
    }

    await prisma.organization.update({
      where: {
        id: organization.id,
      },
      data: {
        emailVerifiedAt: new Date(),
        verificationToken: null,
        verificationTokenExpiresAt: null,
      },
    });

    return {
      status: "success",
      message: "Your email has been verified successfully.",
      errors: {},
    };
  } catch (error) {
    console.error("Email verification failed:", error);

    return {
      status: "error",
      message: "Something went wrong. Please try again later.",
      errors: {},
    };
  }
}
