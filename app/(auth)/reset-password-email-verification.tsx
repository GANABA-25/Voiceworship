"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useActionState, useState, useEffect } from "react";
import { validateResetPasswordEmail } from "@/util/validations";
import { resetPasswordEmailVerification } from "@/actions/auth/reset-password-email-verification";
import { resetPasswordEmailType } from "@/types/auth-types";
import { formState } from "@/types/auth-types";
import { Mail, MoveLeft } from "lucide-react";
import Link from "next/link";

import Input from "@/components/input";
import Button2 from "@/components/ui/button-2";

export default function ResetPasswordEmailVerification() {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof resetPasswordEmailType, string>>
  >({});
  const [didEdit, setDidEdit] = useState({
    email: false,
  });

  const [resetPasswordData, setResetPasswordData] =
    useState<resetPasswordEmailType>({
      email: "",
    });

  const [formState, formAction, isPending] = useActionState<
    formState,
    FormData
  >(resetPasswordEmailVerification, {
    status: undefined,
    message: "",
    errors: {},
  });

  const validationErrors = validateResetPasswordEmail(resetPasswordData);

  const getFieldError = (field: keyof resetPasswordEmailType) => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const inputBlurHandler = (identifier: keyof resetPasswordEmailType) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const inputChangeHandler = (
    inputIdentifier: keyof resetPasswordEmailType,
    value: string,
  ) => {
    setResetPasswordData((prev) => ({
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
    const validationErrors = validateResetPasswordEmail(resetPasswordData);

    setDidEdit({
      email: true,
    });

    if (Object.values(validationErrors).some((error) => error !== "")) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      setResetPasswordData({
        email: "",
      });

      setDidEdit({
        email: false,
      });

      setServerErrors({});
      router.push("/auth?mode=otp");
      toast.success(formState.message);
    }

    if (formState.status === "error") {
      setServerErrors(formState.errors || {});
      toast.error(formState.message);
    }
  }, [formState]);

  return (
    <div className="space-y-6 my-8 md:my-0">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold">Reset your password</h1>
        <p className="text-muted">
          Enter your email and we'll help you get back into your account
        </p>
      </div>
      <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          icon={<Mail size={15} />}
          label="Email"
          placeholder="you@gmail.com"
          value={resetPasswordData.email}
          onChange={(event) => inputChangeHandler("email", event?.target.value)}
          onBlur={() => inputBlurHandler("email")}
          hasError={getFieldError("email")}
        />

        <Button2
          type="submit"
          isLoading={isPending}
          bg="bg-primary hover:bg-primary-light p-4 text-black w-full font-bold"
          label="Send Reset Link"
        />
      </form>

      <div className="flex justify-center items-center">
        <Link
          href="/auth?mode=signin"
          className="text-primary cursor-pointer hover:text-primary-light flex items-center gap-2"
        >
          <MoveLeft />
          Back to Sign in
        </Link>
      </div>
    </div>
  );
}
