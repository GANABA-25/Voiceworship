"use client";

import loadingAnimation from "@/public/svgs/loading.svg";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MailCheck,
  ShieldCheck,
  LoaderCircle,
  CircleX,
  ArrowRight,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";

import Logo from "@/components/logo";

type VerificationStatus = "loading" | "success" | "error" | "missing";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<VerificationStatus>("loading");

  useEffect(() => {
    if (!token) {
      toast("missing");
      return;
    }

    setStatus("loading");
  }, [token]);

  return (
    <main className="flex justify-center items-center text-center h-screen">
      <div className="space-y-8">
        <Logo />
        <div className="space-y-8 border border-border bg-card p-8 rounded-md shadow-sm">
          <div className="flex justify-center items-center">
            <div className="bg-primary/20 rounded-full p-4">
              {status === "loading" ? (
                <img
                  src={loadingAnimation.src ?? loadingAnimation}
                  alt="Loading"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              ) : status === "success" ? (
                <ShieldCheck size={38} />
              ) : status === "error" || status === "missing" ? (
                <CircleX size={38} />
              ) : (
                <Mail size={36} />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-primary uppercase font-bold">
              Account Verification
            </p>
            <h1 className="text-4xl font-bold text-text">
              {status === "loading" && "Verify your email"}
              {status === "success" && "Email verified!"}
              {status === "error" && "Verification failed"}
              {status === "missing" && "Verification link missing"}
            </h1>
            <p className="text-muted">
              We're preparing to verify your email address. <br /> This helps
              keep your VoiceWorship account secure
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 bg-primary/70 p-2 rounded-md">
            <img
              src={loadingAnimation.src ?? loadingAnimation}
              alt="Loading"
              width={20}
              height={20}
              className="shrink-0"
            />
            <p>Preparing verification...</p>
          </div>

          <div className="bg-muted w-full h-px" />

          <div className="flex items-start gap-4 bg-border p-4 rounded-md">
            <ShieldCheck size={15} />
            <p>
              Your security matters. Verification links are private <br /> and
              should not be shared with anyone
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
