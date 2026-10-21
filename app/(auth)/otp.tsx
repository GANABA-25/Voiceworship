"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { verifyOtp } from "@/actions/auth/verify-otp";
import { validateOtpData } from "@/util/validations";
import { resendOtp } from "@/actions/auth/resend-otp";

import { useActionState, useState, useEffect } from "react";
import { OtpType } from "@/types/auth-types";
import { formState } from "@/types/auth-types";

import Input from "@/components/input";
import Button2 from "@/components/ui/button-2";

import { Binary } from "lucide-react";

const OTP_LENGTH = 6;
const OTP_EXPIRY_SECONDS = 5 * 60;
const RESEND_COOLDOWN_SECONDS = 60;

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function Otp() {
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof OtpType, string>>
  >({});
  const [didEdit, setDidEdit] = useState({
    otp: false,
  });

  const [otpData, setOtpData] = useState<OtpType>({
    otp: "",
  });

  const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRY_SECONDS);
  const [timerKey, setTimerKey] = useState(0);

  const [formState, formAction, isPending] = useActionState<
    formState,
    FormData
  >(verifyOtp, {
    status: undefined,
    message: "",
    errors: {},
  });

  const isExpired = secondsLeft === 0;
  const canResend = OTP_EXPIRY_SECONDS - secondsLeft >= RESEND_COOLDOWN_SECONDS;
  const resendIn = Math.max(
    0,
    RESEND_COOLDOWN_SECONDS - (OTP_EXPIRY_SECONDS - secondsLeft),
  );

  const validationErrors = validateOtpData(otpData);

  useEffect(() => {
    const expiresAt = Date.now() + OTP_EXPIRY_SECONDS * 1000;
    setSecondsLeft(OTP_EXPIRY_SECONDS);

    const id = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [timerKey]);

  const getFieldError = (field: keyof OtpType) => {
    if (didEdit[field]) {
      return validationErrors[field];
    }

    return serverErrors[field];
  };

  const inputBlurHandler = (identifier: keyof OtpType) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const inputChangeHandler = (
    inputIdentifier: keyof OtpType,
    value: string,
  ) => {
    const cleaned = value.replace(/\D/g, "").slice(0, OTP_LENGTH);

    setOtpData((prev) => ({
      ...prev,
      [inputIdentifier]: cleaned,
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
    if (isExpired) {
      e.preventDefault();
      toast.error("This code has expired. Please request a new one.");
      return;
    }

    const validationErrors = validateOtpData(otpData);

    setDidEdit({
      otp: true,
    });

    if (Object.values(validationErrors).some((error) => error !== "")) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      setOtpData({
        otp: "",
      });

      setDidEdit({
        otp: false,
      });

      setServerErrors({});
      toast.success(formState.message);
      router.push("/auth?mode=new-password");
    }

    if (formState.status === "error") {
      setServerErrors(formState.errors || {});
      toast.error(formState.message);
    }
  }, [formState]);

  const handleResend = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);

    const result = await resendOtp();

    if (result.status === "success") {
      setOtpData({ otp: "" });
      setDidEdit({ otp: false });
      setServerErrors({});
      setTimerKey((prev) => prev + 1);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsResending(false);
  };

  return (
    <div className="space-y-6 my-8 md:my-0">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold">
          Enter Verification Code
        </h1>
        <p className="text-muted">
          A one-time verification code has been sent to your phone number.
          Please enter the code below to continue.
        </p>
      </div>
      <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="otp"
          icon={<Binary size={15} />}
          label="OTP"
          placeholder="Enter OTP"
          value={otpData.otp}
          onChange={(event) => inputChangeHandler("otp", event?.target.value)}
          onBlur={() => inputBlurHandler("otp")}
          hasError={getFieldError("otp")}
        />

        <Button2
          type="submit"
          isLoading={isPending}
          bg="bg-primary hover:bg-primary-light p-4 text-black w-full font-bold"
          label="Verify & Continue"
        />
      </form>

      <div className="text-center">
        {isExpired ? (
          <p className="font-medium text-danger">
            Code expired. Request a new one below.
          </p>
        ) : (
          <p className="text-muted">
            Code expires in{" "}
            <span
              className={`font-bold tabular-nums ${
                secondsLeft <= 30 ? "text-danger" : "text-primary"
              }`}
            >
              {formatTime(secondsLeft)}
            </span>
          </p>
        )}
      </div>

      <p className="text-muted text-center">Didn't receive the code? </p>

      <div className="flex justify-center items-center">
        {canResend ? (
          <Button2
            isLoading={isResending}
            onClick={handleResend}
            label="Resend"
          />
        ) : (
          <span className="text-muted tabular-nums">Resend in {resendIn}s</span>
        )}
      </div>
    </div>
  );
}
