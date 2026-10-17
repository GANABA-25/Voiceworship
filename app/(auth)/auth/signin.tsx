import Link from "next/link";
import { Mail, LockKeyhole } from "lucide-react";

import Input from "@/components/input";
import Button2 from "@/components/ui/button-2";

export default function SignIn() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Welcome back</h1>
        <p className="text-muted">
          Sign in to continue to your VoiceWorship workspace
        </p>
      </div>

      <Input
        type="email"
        icon={<Mail size={15} />}
        label="Email"
        placeholder="you@gmail.com"
      />
      <Input
        type="password"
        icon={<LockKeyhole size={15} />}
        label="Password"
        placeholder="Enter your password"
      />

      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2">
          <input
            type="select"
            className="w-5 h-5 border border-border bg-white"
          />
          <p className="text-muted text-sm">Remember me</p>
        </div>

        <button className="text-primary">Forgot Password?</button>
      </div>

      <Button2
        bg="bg-primary hover:bg-primary-light p-4 text-black w-full font-bold"
        label="Sign in"
      />

      <div className="flex items-center gap-4">
        <div className="bg-border w-full p-px" />
        <p className="uppercase font-bold">or</p>
        <div className="bg-border w-full p-px" />
      </div>

      <Button2 bg="w-full" label="Continue with Google (coming soon)" />

      <span className="flex flex-col md:flex-row justify-center items-center gap-2">
        <p className="text-sm text-muted">Don't have an account?</p>
        <Link
          href="/auth?mode=signup"
          className="text-primary cursor-pointer hover:text-primary-light"
        >
          Create an account
        </Link>
      </span>
    </div>
  );
}
