"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/server/prisma";
import bcrypt from "bcryptjs";
import type { formState } from "@/types/auth-types";
import { validateNewPasswordData } from "@/util/validations";

export async function newPassword(
  previousState: formState,
  formData: FormData,
): Promise<formState> {
  try {
    const newPassword = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const errors = validateNewPasswordData(newPassword);

    if (Object.values(errors).some((error) => error !== "")) {
      return {
        status: "error",
        message: "Please fix the errors below",
        errors,
      };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("reset_token")?.value;
    if (!token) {
      return {
        status: "error",
        message: "Your session has expired. Please request a new code.",
      };
    }

    let payload: { id: string; purpose: string };
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as typeof payload;
    } catch {
      return {
        status: "error",
        message: "Your session has expired. Please request a new code.",
      };
    }

    if (payload.purpose !== "password-reset") {
      return { status: "error", message: "Invalid request." };
    }

    const passwordHash = await bcrypt.hash(newPassword.password, 12);

    await prisma.organization.update({
      where: { id: payload.id },
      data: { passwordHash },
    });

    cookieStore.delete("reset_token");

    return {
      status: "success",
      message: "Password updated. You can now sign in.",
    };
  } catch (error) {
    console.error("[setNewPassword] failed:", error);
    return {
      status: "error",
      message: "We couldn't update your password. Please try again.",
    };
  }
}
