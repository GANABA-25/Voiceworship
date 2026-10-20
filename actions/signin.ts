"use server";

import { randomBytes, createHash } from "node:crypto";

import prisma from "@/lib/server/prisma";
import bcrypt from "bcryptjs";
import type { formState } from "@/types/auth-types";
import { validateSignInData } from "@/util/validations";
import { verifyEmailTemplate } from "@/services/templates/verifyEmail";

export async function signIn(
  previousState: formState,
  formData: FormData,
): Promise<formState> {
  const signInData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log(signInData);

  const errors = validateSignInData(signInData);

  if (Object.values(errors).some((error) => error !== "")) {
    return {
      status: "error",
      message: "Please fix the errors below",
      errors,
    };
  }

  return {
    status: "success",
    message: "Account created. Please verify your email.",
  };
}
