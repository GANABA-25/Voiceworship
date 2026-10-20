"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { formState } from "@/types/auth-types";
import { useActionState, useState, useEffect } from "react";
import { signInType } from "@/types/auth-types";
import { signIn } from "@/actions/auth/signin";
import Link from "next/link";
import { Mail, LockKeyhole } from "lucide-react";
import { validateSignInData } from "@/util/validations";
import { useAuth } from "@/store/auth-context";

import Input from "@/components/input";
import Button2 from "@/components/ui/button-2";

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof signInType, string>>
  >({});

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const [signInData, setSignIntData] = useState<signInType>({
    email: "",
    password: "",
  });

  const [formState, formAction, isPending] = useActionState<
    formState,
    FormData
  >(signIn, {
    status: undefined,
    message: "",
    errors: {},
  });

  const validationErrors = validateSignInData(signInData);

  const getFieldError = (field: keyof signInType) => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const inputBlurHandler = (identifier: keyof signInType) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const inputChangeHandler = (
    inputIdentifier: keyof signInType,
    value: string,
  ) => {
    setSignIntData((prev) => ({
      ...prev,
      [inputIdentifier]: value,
    }));

    setDidEdit((prev) => ({
      ...prev,
      [inputIdentifier]: false,
    }));

    setServerErrors((prev) => ({
      ...prev,
      [inputIdentifier]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const validationErrors = validateSignInData(signInData);

    setDidEdit({
      email: true,
      password: true,
    });

    if (Object.values(validationErrors).some((error) => error !== "")) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success" && formState.profile) {
      setSignIntData({
        email: "",
        password: "",
      });

      setDidEdit({
        email: false,
        password: false,
      });

      setServerErrors({});

      toast.success(formState.message);

      login(formState.profile);
      router.replace("/dashboard");
      router.refresh();
    }

    if (formState.status === "error") {
      setServerErrors(formState.errors || {});
      toast.error(formState.message);
    }
  }, [formState]);

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Welcome back</h1>
        <p className="text-muted">
          Sign in to continue to your VoiceWorship workspace
        </p>
      </div>

      <Input
        type="email"
        name="email"
        icon={<Mail size={15} />}
        label="Email"
        placeholder="you@gmail.com"
        value={signInData.email}
        onChange={(event) => inputChangeHandler("email", event?.target.value)}
        onBlur={() => inputBlurHandler("email")}
        hasError={getFieldError("email")}
      />
      <Input
        type="password"
        name="password"
        icon={<LockKeyhole size={15} />}
        label="Password"
        placeholder="Enter your password"
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        value={signInData.password}
        onChange={(event) =>
          inputChangeHandler("password", event?.target.value)
        }
        onBlur={() => inputBlurHandler("password")}
        hasError={getFieldError("password")}
      />

      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2">
          <input
            type="select"
            className="w-5 h-5 border border-border bg-white"
          />
          <p className="text-muted text-sm">Remember me</p>
        </div>

        <Link
          href="/auth?mode=reset-password-email-verification"
          className="text-primary cursor-pointer hover:text-primary-light"
        >
          Forgot Password?
        </Link>
      </div>

      <Button2
        type="submit"
        isLoading={isPending}
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
    </form>
  );
}
