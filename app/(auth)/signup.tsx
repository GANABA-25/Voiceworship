"use client";

import { validateCreateAccountData } from "@/util/validations";
import { formState } from "@/types/auth-types";
import { createAccountType } from "@/types/auth-types";
import { createAccount } from "@/actions/create-account";
import { useActionState, useState, useEffect } from "react";
import { toast } from "react-toastify";

import Link from "next/link";
import Input from "@/components/input";
import Button2 from "@/components/ui/button-2";

import { Mail, LockKeyhole, FileSpreadsheet } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof createAccountType, string>>
  >({});

  const [didEdit, setDidEdit] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
    organizationName: false,
  });

  const [createAccountData, setCreateAccountData] = useState<createAccountType>(
    {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
    },
  );

  const [formState, formAction, isPending] = useActionState<
    formState,
    FormData
  >(createAccount, {
    status: undefined,
    message: "",
    errors: {},
  });

  const validationErrors = validateCreateAccountData(createAccountData);

  const getFieldError = (field: keyof createAccountType) => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const inputBlurHandler = (identifier: keyof createAccountType) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const inputChangeHandler = (
    inputIdentifier: keyof createAccountType,
    value: string,
  ) => {
    setCreateAccountData((prev) => ({
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
    const validationErrors = validateCreateAccountData(createAccountData);

    setDidEdit({
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      password: true,
      confirmPassword: true,
      organizationName: true,
    });

    if (Object.values(validationErrors).some((error) => error !== "")) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      setCreateAccountData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        organizationName: "",
      });

      setDidEdit({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        password: false,
        confirmPassword: false,
        organizationName: false,
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
        <h1 className="text-2xl md:text-4xl font-bold">
          Create your <br /> VoiceWorship account
        </h1>
        <p className="text-muted">
          Start building a smarter worship presentation workflow.
        </p>
      </div>

      <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="firstName"
            icon={<FileSpreadsheet size={15} />}
            label="First Name"
            placeholder="you@gmail.com"
            value={createAccountData.firstName}
            onChange={(event) =>
              inputChangeHandler("firstName", event?.target.value)
            }
            onBlur={() => inputBlurHandler("firstName")}
            hasError={getFieldError("firstName")}
          />

          <Input
            type="text"
            name="lastName"
            icon={<FileSpreadsheet size={15} />}
            label="Last Name"
            placeholder="you@gmail.com"
            value={createAccountData.lastName}
            onChange={(event) =>
              inputChangeHandler("lastName", event?.target.value)
            }
            onBlur={() => inputBlurHandler("lastName")}
            hasError={getFieldError("lastName")}
          />

          <Input
            type="email"
            name="email"
            icon={<Mail size={15} />}
            label="Email"
            placeholder="you@gmail.com"
            value={createAccountData.email}
            onChange={(event) =>
              inputChangeHandler("email", event?.target.value)
            }
            onBlur={() => inputBlurHandler("email")}
            hasError={getFieldError("email")}
          />

          <Input
            type="phone"
            name="phoneNumber"
            icon={<Mail size={15} />}
            label="Phone Number"
            placeholder="0596498006"
            value={createAccountData.phoneNumber}
            onChange={(event) =>
              inputChangeHandler("phoneNumber", event?.target.value)
            }
            onBlur={() => inputBlurHandler("phoneNumber")}
            hasError={getFieldError("phoneNumber")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="password"
            name="password"
            icon={<LockKeyhole size={15} />}
            label="Password"
            placeholder="Enter your password"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            value={createAccountData.password}
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
            label="Confirm Password"
            placeholder="Confirm Password"
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
            value={createAccountData.confirmPassword}
            onChange={(event) =>
              inputChangeHandler("confirmPassword", event?.target.value)
            }
            onBlur={() => inputBlurHandler("confirmPassword")}
            hasError={getFieldError("confirmPassword")}
          />
        </div>

        <Input
          type="text"
          icon={<FileSpreadsheet size={15} />}
          label="Church / Organization Name"
          placeholder="Enter Church / Organization Name"
          name="organizationName"
          value={createAccountData.organizationName}
          onChange={(event) =>
            inputChangeHandler("organizationName", event?.target.value)
          }
          onBlur={() => inputBlurHandler("organizationName")}
          hasError={getFieldError("organizationName")}
        />

        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-2">
            <input
              type="select"
              className="w-5 h-5 border border-border bg-white"
            />
            <p className="text-muted text-xs md:text-sm">
              I agree to the{" "}
              <span className="text-primary font-bold">Terms of Service</span>{" "}
              and <span className="text-primary font-bold">Privacy Policy</span>
            </p>
          </div>
        </div>

        <Button2
          type="submit"
          isLoading={isPending}
          bg="bg-primary hover:bg-primary-light p-4 text-black w-full font-bold"
          label="Create Account"
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
      </form>
    </div>
  );
}
