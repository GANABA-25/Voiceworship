"use server";

import prisma from "@/lib/server/prisma";

import type { formState } from "@/types/auth-types";

export async function createAccount(
  previousState: formState,
  formData: FormData,
): Promise<formState> {
  const signUpData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    organizationName: formData.get("organizationName") as string,
  };

  if (!signUpData) {
    return {
      status: "error",
      message: "Please enter your first name.",
      errors: {
        firstName: "First name is required.",
      },
    };
  }

  return {
    status: "success",
    message: "Form submitted successfully.",
    errors: {},
  };
}
