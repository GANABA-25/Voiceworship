"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowRight, CircleX, ShieldCheck } from "lucide-react";

import { verifyEmail } from "@/actions/verify-email";
import Logo from "@/components/logo";
import loadingAnimation from "@/public/svgs/loading.svg";

type VerificationStatus = "loading" | "success" | "error" | "missing";

type StatusConfig = {
  title: string;
  description: string;
  banner: string;
  iconWrap: string;
  titleColor: string;
  bannerStyle: string;
};

const STATUS_CONFIG: Record<VerificationStatus, StatusConfig> = {
  loading: {
    title: "Verify your email",
    description:
      "We're verifying your email address. This helps keep your VoiceWorship account secure.",
    banner: "Preparing verification...",
    iconWrap: "bg-primary/20 text-primary",
    titleColor: "text-text",
    bannerStyle: "bg-primary/15 text-primary",
  },
  success: {
    title: "Email verified",
    description:
      "Your email address has been confirmed. You can now sign in to your VoiceWorship account.",
    banner: "Your email has been verified",
    iconWrap: "bg-success/20 text-success",
    titleColor: "text-success",
    bannerStyle: "bg-success/15 text-success",
  },
  error: {
    title: "Verification failed",
    description:
      "We couldn't verify your email address. The link may be invalid or may have expired.",
    banner: "This link is invalid or has expired",
    iconWrap: "bg-danger/20 text-danger",
    titleColor: "text-danger",
    bannerStyle: "bg-danger/15 text-danger",
  },
  missing: {
    title: "Unable to verify email",
    description:
      "This page needs a verification link. Please use the link in your email or request a new one.",
    banner: "No verification token was found in the link",
    iconWrap: "bg-danger/20 text-danger",
    titleColor: "text-danger",
    bannerStyle: "bg-danger/15 text-danger",
  },
};

const spinnerSrc =
  (loadingAnimation as { src?: string }).src ?? (loadingAnimation as string);

function Spinner({ size }: { size: number }) {
  return (
    <img
      src={spinnerSrc}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="shrink-0"
    />
  );
}

function StatusIcon({
  status,
  size,
}: {
  status: VerificationStatus;
  size: number;
}) {
  if (status === "loading") return <Spinner size={size} />;
  if (status === "success") return <ShieldCheck size={size} />;
  return <CircleX size={size} />;
}

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState<string | null>(null);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!token) {
      setStatus("missing");
      toast.error(
        "We couldn't complete the verification. Please use the link in your email or request a new one.",
      );
      return;
    }

    async function verify(verificationToken: string) {
      try {
        const result = await verifyEmail(verificationToken);

        if (result.status === "success") {
          setStatus("success");
          toast.success(result.message ?? "Your email has been verified.");
        } else {
          setStatus("error");
          setMessage(result.message ?? null);
          toast.error(result.message ?? "Verification could not be completed.");
        }
      } catch {
        setStatus("error");
        toast.error("Unable to verify your email. Please try again.");
      }
    }

    void verify(token);
  }, [token]);

  const config = STATUS_CONFIG[status];

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 text-center">
      <div className="w-full max-w-md space-y-8">
        <Logo />

        <div className="space-y-8 rounded-md border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center justify-center">
            <div className={`rounded-full p-4 ${config.iconWrap}`}>
              <StatusIcon status={status} size={38} />
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-bold uppercase text-primary">
              Account Verification
            </p>
            <h1 className={`text-4xl font-bold ${config.titleColor}`}>
              {config.title}
            </h1>
            <p className="text-muted">{config.description}</p>
          </div>

          <div
            role="status"
            aria-live="polite"
            className={`flex items-center justify-center gap-3 rounded-md p-3 ${config.bannerStyle}`}
          >
            {status === "loading" ? (
              <Spinner size={20} />
            ) : (
              <StatusIcon status={status} size={18} />
            )}
            <p>{message ?? config.banner}</p>
          </div>

          {status === "success" && (
            <Link
              href="/auth?mode=signin"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-white transition-all duration-150 hover:opacity-90 active:scale-95"
            >
              Continue to sign in
              <ArrowRight size={16} />
            </Link>
          )}

          {(status === "error" || status === "missing") && (
            <Link
              href="/resend-verification"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 font-medium text-text transition-all duration-150 hover:bg-hover active:scale-95"
            >
              Request a new link
              <ArrowRight size={16} />
            </Link>
          )}

          <div className="h-px w-full bg-border" />

          <div className="flex items-start gap-4 rounded-md bg-border p-4 text-left">
            <ShieldCheck size={15} className="mt-1 shrink-0" />
            <p>
              Your security matters. Verification links are private and should
              not be shared with anyone.
            </p>
          </div>
        </div>

        <p className="text-muted">
          © {new Date().getFullYear()} VoiceWorship. Made for uninterrupted
          worship.
        </p>
      </div>
    </main>
  );
}
