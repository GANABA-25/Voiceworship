"use server";

import { randomBytes, createHash } from "node:crypto";

import prisma from "@/lib/server/prisma";
import bcrypt from "bcryptjs";
import type { formState } from "@/types/auth-types";
import { validateCreateAccountData } from "@/util/validations";
import formatPhoneNumber from "@/util/formate-phone-number";
import { sendEmail } from "@/services/email.service";
import { verifyEmailTemplate } from "@/services/templates/verifyEmail";

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

  const errors = validateCreateAccountData(signUpData);

  if (Object.values(errors).some((error) => error !== "")) {
    return {
      status: "error",
      message: "Please fix the errors below",
      errors,
    };
  }

  const existingAccount = await prisma.organization.findUnique({
    where: { email: signUpData.email },
  });

  if (existingAccount) {
    return {
      status: "error",
      message:
        "Unable to create your account with the provided details. Please try another email address or sign in.",
    };
  }

  const hashedPassword = await bcrypt.hash(signUpData.password, 12);
  const token = randomBytes(32).toString("hex");
  const hashedToken = createHash("sha256").update(token).digest("hex");

  const formattedPhoneNumber = formatPhoneNumber(signUpData.phoneNumber);

  const data = {
    firstName: signUpData.firstName,
    lastName: signUpData.lastName,
    email: signUpData.email,
    phoneNumber: formattedPhoneNumber,
    passwordHash: hashedPassword,
    organizationName: signUpData.organizationName,
    verificationToken: hashedToken,
    verificationTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
  };

  await prisma.organization.create({ data });

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await sendEmail({
    to: signUpData.email,
    subject: "Verify your email",
    html: verifyEmailTemplate(verifyUrl),
  });

  return {
    status: "success",
    message: "Account created. Please verify your email.",
  };
}
