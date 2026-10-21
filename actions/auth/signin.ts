"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/server/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { formState } from "@/types/auth-types";
import { validateSignInData } from "@/util/validations";
import { getSubscriptionAccess } from "@/lib/server/subscription";

export async function signIn(
  previousState: formState,
  formData: FormData,
): Promise<formState> {
  try {
    const signInData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const errors = validateSignInData(signInData);

    if (Object.values(errors).some((error) => error !== "")) {
      return {
        status: "error",
        message: "Please fix the errors below",
        errors,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: signInData.email,
      },
    });

    if (!user) {
      return {
        status: "error",
        message: "Invalid email or password.",
      };
    }

    if (!user.emailVerifiedAt) {
      return {
        status: "error",
        message:
          "Please verify your email before signing in. Check your inbox for the verification link.",
      };
    }

    const passwordMatch = await bcrypt.compare(
      signInData.password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      return {
        status: "error",
        message: "Invalid email or password.",
      };
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        role: user.phoneNumber,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "4h" },
    );

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 4,
    });

    const { hasAccess } = await getSubscriptionAccess(user.id);

    return {
      message: "Sign in successful",
      status: "success",
      redirectTo: hasAccess ? "/dashboard" : "/pricing",
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        organizationName: user?.organizationName,
      },
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
