import "server-only";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type Session = {
  id: string;
  email: string;
};

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as Session;
    return payload;
  } catch {
    return null;
  }
}

export async function hasResetEmail(): Promise<boolean> {
  return !!(await cookies()).get("reset_email")?.value;
}

export async function hasValidResetToken(): Promise<boolean> {
  const token = (await cookies()).get("reset_token")?.value;
  if (!token) return false;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      purpose?: string;
    };
    return payload.purpose === "password-reset";
  } catch {
    return false;
  }
}
