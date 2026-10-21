"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { resendVerificationEmail } from "@/actions/auth/resend-verification-email";
import Button2 from "@/components/ui/button-2";

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmailNotice({ email }: { email: string }) {
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cooldown <= 0) return;

    const id = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0 || isPending) return;

    startTransition(async () => {
      const result = await resendVerificationEmail(email);

      if (result.status === "success") {
        toast.success(result.message);
        setCooldown(RESEND_COOLDOWN_SECONDS);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-8 md:my-0 text-center border border-border rounded-md bg-card p-8 shadow-sm">
      <h1 className="text-2xl md:text-4xl font-bold text-text">
        Check your email
      </h1>
      <p className="text-muted">
        We've sent a verification link to{" "}
        <span className="font-bold text-primary">{email}</span>. Click the link
        to activate your account. It expires in 1 hour.
      </p>

      <p className="text-muted">
        Didn't get it? Check your spam folder
        {cooldown > 0 && (
          <span className="tabular-nums">resend in {cooldown}s</span>
        )}
      </p>

      <div className="flex items-center gap-4">
        <div className="bg-muted w-full h-px" />
        <p>OR</p>
        <div className="bg-muted w-full h-px" />
      </div>

      <Button2
        onClick={handleResend}
        bg={`bg-primary hover:bg-primary-light p-4 text-black w-full font-bold ${cooldown > 0 ? "cursor-not-allowed opacity-50" : "opacity-100 cursor-pointer"}`}
        isLoading={isPending}
        type="button"
        label="resend the email"
      />

      <Link
        href="/auth?mode=signin"
        className="text-primary cursor-pointer hover:text-primary-light"
      >
        Back to Sign in
      </Link>
    </div>
  );
}
