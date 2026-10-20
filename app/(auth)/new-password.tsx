"use client";

import { validateNewPasswordData } from "@/util/validations";
import { formState } from "@/types/auth-types";
import { newPasswordType } from "@/types/auth-types";
import { newPassword } from "@/actions/auth/new-password";
import { useActionState, useState, useEffect } from "react";
import { toast } from "react-toastify";

import Link from "next/link";
import Input from "@/components/input";
import Button2 from "@/components/ui/button-2";

import { LockKeyhole } from "lucide-react";

export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof newPasswordType, string>>
  >({});

  const [didEdit, setDidEdit] = useState({
    password: false,
    confirmPassword: false,
  });

  const [NewPassword, setNewPassword] = useState<newPasswordType>({
    password: "",
    confirmPassword: "",
  });

  const [formState, formAction, isPending] = useActionState<
    formState,
    FormData
  >(newPassword, {
    status: undefined,
    message: "",
    errors: {},
  });

  const validationErrors = validateNewPasswordData(NewPassword);

  const getFieldError = (field: keyof newPasswordType) => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const inputBlurHandler = (identifier: keyof newPasswordType) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const inputChangeHandler = (
    inputIdentifier: keyof newPasswordType,
    value: string,
  ) => {
    setNewPassword((prev) => ({
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
    const validationErrors = validateNewPasswordData(NewPassword);

    setDidEdit({
      password: true,
      confirmPassword: true,
    });

    if (Object.values(validationErrors).some((error) => error !== "")) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      setNewPassword({
        password: "",
        confirmPassword: "",
      });

      setDidEdit({
        password: false,
        confirmPassword: false,
      });

      setServerErrors({});

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
        <h1 className="text-2xl md:text-4xl font-bold">New Password</h1>
        <p className="text-muted">Enter your new password</p>
      </div>

      <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          name="password"
          icon={<LockKeyhole size={15} />}
          label="New Password"
          placeholder="Enter your password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          value={NewPassword.password}
          onChange={(event) =>
            inputChangeHandler("password", event?.target.value)
          }
          onBlur={() => inputBlurHandler("password")}
          hasError={getFieldError("password")}
        />

        <Input
          type="password"
          name="confirmPassword"
          icon={<LockKeyhole size={15} />}
          label="Confirm New Password"
          placeholder="Confirm Password"
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
          value={NewPassword.confirmPassword}
          onChange={(event) =>
            inputChangeHandler("confirmPassword", event?.target.value)
          }
          onBlur={() => inputBlurHandler("confirmPassword")}
          hasError={getFieldError("confirmPassword")}
        />

        <Button2
          type="submit"
          isLoading={isPending}
          bg="bg-primary hover:bg-primary-light p-4 text-black w-full font-bold"
          label="Create Account"
        />

        <span className="flex justify-center items-center gap-2">
          <p className="text-sm text-muted">Already have an account?</p>
          <Link
            href="/auth?mode=signin"
            className="text-primary cursor-pointer hover:text-primary-light"
          >
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
}
