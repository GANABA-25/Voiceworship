"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/logo";

import SignIn from "../signin";
import SignUp from "../signup";
import ForgotPassword from "../forgot-password";
import Otp from "../otp";
import NewPassword from "../new-password";

export default function AuthView({ mode }: { mode: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-dvh px-8 md:px-0">
      <div className="mt-12 md:hidden">
        <Logo />
      </div>
      <section className="hidden lg:flex flex-col justify-between items-start relative isolate min-h-[calc(100vh-56px)] overflow-hidden border-r border-border p-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-130 w-212.5 -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
        </div>
        <Logo />

        <h1 className="font-black text-5xl leading-16 uppercase">
          Your worship <br /> presentation,{" "}
          <span className="text-primary">
            controlled <br /> by your voice.
          </span>
        </h1>
        <Image
          src="https://res.cloudinary.com/dkjlpfa1q/image/upload/v1792072434/Screenshot_2026-10-15_14-01-08_tczx5r.png"
          alt="VoiceWorship"
          width={1920}
          height={1080}
          priority
          unoptimized
          className="block h-auto w-300 rounded-md object-cover border border-border"
        />

        <p className="text-muted">© VoiceWorship</p>
      </section>

      <section className="flex md:justify-center md:items-center">
        <div className="w-full max-w-xl space-y-8">
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 text-muted w-40"
          >
            <ArrowLeft size={15} />
            <p>Back to home</p>
          </Link>

          {mode === "signin" && <SignIn />}
          {mode === "signup" && <SignUp />}
          {mode === "forgot-password" && <ForgotPassword />}
          {mode === "otp" && <Otp />}
          {mode === "new-password" && <NewPassword />}
        </div>
      </section>
    </div>
  );
}
