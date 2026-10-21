import { redirect } from "next/navigation";
import { hasResetEmail, hasValidResetToken } from "@/lib/session";
import AuthView from "./auth-view";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode = "signin" } = await searchParams;

  if (mode === "otp" && !(await hasResetEmail())) {
    redirect("/auth?mode=forgot-password");
  }

  if (mode === "new-password" && !(await hasValidResetToken())) {
    redirect("/auth?mode=forgot-password");
  }

  return <AuthView mode={mode} />;
}
