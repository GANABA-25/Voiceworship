import { Mail, LockKeyhole, FileSpreadsheet } from "lucide-react";

import Link from "next/link";

import Input from "@/components/input";
import Button2 from "@/components/ui/button-2";

export default function SignUp() {
  return (
    <div className="space-y-6 my-8 md:my-0">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold">
          Create your <br /> VoiceWorship account
        </h1>
        <p className="text-muted">
          Start building a smarter worship presentation workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          icon={<FileSpreadsheet size={15} />}
          label="First Name"
          placeholder="you@gmail.com"
        />

        <Input
          type="text"
          icon={<FileSpreadsheet size={15} />}
          label="Last Name"
          placeholder="you@gmail.com"
        />
      </div>

      <Input
        type="email"
        icon={<Mail size={15} />}
        label="Email"
        placeholder="you@gmail.com"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="password"
          icon={<LockKeyhole size={15} />}
          label="Password"
          placeholder="Enter your password"
        />

        <Input
          type="password"
          icon={<LockKeyhole size={15} />}
          label="Confirm Password"
          placeholder="Confirm Password"
        />
      </div>
      <Input
        type="text"
        icon={<FileSpreadsheet size={15} />}
        label="Church / Organization Name"
        placeholder="Enter Church / Organization Name"
      />

      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2">
          <input
            type="select"
            className="w-5 h-5 border border-border bg-white"
          />
          <p className="text-muted text-xs md:text-sm">
            I agree to the{" "}
            <span className="text-primary font-bold">Terms of Service</span> and{" "}
            <span className="text-primary font-bold">Privacy Policy</span>
          </p>
        </div>
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

      <span className="flex justify-center items-center gap-2">
        <p className="text-sm text-muted">Already have an account?</p>
        <Link
          href="/auth?mode=signin"
          className="text-primary cursor-pointer hover:text-primary-light"
        >
          Sign In
        </Link>
      </span>
    </div>
  );
}
