import { Mail, MoveLeft } from "lucide-react";

import Link from "next/link";

import Input from "@/components/input";
import Button2 from "@/components/ui/button-2";

export default function ResetPassword() {
  return (
    <div className="space-y-6 my-8 md:my-0">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold">Reset your password</h1>
        <p className="text-muted">
          Enter your email and we'll help you get back into your account
        </p>
      </div>

      <Input
        type="email"
        icon={<Mail size={15} />}
        label="Email"
        placeholder="you@gmail.com"
      />

      <Button2
        bg="bg-primary hover:bg-primary-light p-4 text-black w-full font-bold"
        label="Send Reset Link"
      />

      <Link
        href="/auth?mode=signin"
        className="text-primary cursor-pointer hover:text-primary-light flex items-center gap-2"
      >
        <MoveLeft />
        Back to Sign in
      </Link>
    </div>
  );
}
