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
