import {
  createAccountType,
  signInType,
  resetPasswordEmailType,
  OtpType,
  resetPasswordType,
} from "@/types/auth-types";

export const validateCreateAccountData = (
  createAccountData: createAccountType,
) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    organizationName,
  } = createAccountData;

  const errors = {
    firstName: !firstName.trim() ? "First name is required" : "",

    lastName: !lastName.trim() ? "Last name is required" : "",

    email: !email.trim()
      ? "A valid email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Incorrect email format"
        : "",

    phoneNumber: !phoneNumber.trim()
      ? "Phone number is required"
      : !/^[0-9]{10}$/.test(phoneNumber)
        ? "Phone number must be exactly 10 digits"
        : "",

    password: !password.trim()
      ? "Password is required"
      : password.length < 8
        ? "Password must be at least 8 characters long"
        : !/[A-Z]/.test(password)
          ? "Password must contain at least one uppercase letter"
          : !/[a-z]/.test(password)
            ? "Password must contain at least one lowercase letter"
            : !/[0-9]/.test(password)
              ? "Password must contain at least one number"
              : !/[\W_]/.test(password)
                ? "Password must contain at least one special character"
                : "",

    confirmPassword: !confirmPassword.trim()
      ? "Confirm password is required"
      : confirmPassword !== password
        ? "Passwords do not match"
        : "",

    organizationName: !organizationName.trim()
      ? "OrganizationName name is required"
      : "",
  };

  return errors;
};

export const validateSignInData = (signInData: signInType) => {
  const { email, password } = signInData;

  const errors = {
    email: !email.trim()
      ? "A valid email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Incorrect email format"
        : "",

    password: !password.trim() ? "Password is required" : "",
  };

  return errors;
};

export const validateResetPasswordEmail = (
  resetPasswordEmail: resetPasswordEmailType,
) => {
  const { email } = resetPasswordEmail;

  const errors = {
    email: !email.trim()
      ? "A valid email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Incorrect email format"
        : "",
  };

  return errors;
};

const OTP_LENGTH = 6;

export const validateOtpData = (otpData: OtpType) => {
  const otp = (otpData.otp ?? "").trim();

  const errors = {
    otp: !otp
      ? "Verification code is required"
      : !/^\d+$/.test(otp)
        ? "Code must contain numbers only"
        : otp.length !== OTP_LENGTH
          ? `Code must be exactly ${OTP_LENGTH} digits`
          : "",
  };

  return errors;
};

export const validateResetPasswordData = (newPassword: resetPasswordType) => {
  const { password, confirmPassword } = newPassword;

  const errors = {
    password: !password.trim()
      ? "Password is required"
      : password.length < 8
        ? "Password must be at least 8 characters long"
        : !/[A-Z]/.test(password)
          ? "Password must contain at least one uppercase letter"
          : !/[a-z]/.test(password)
            ? "Password must contain at least one lowercase letter"
            : !/[0-9]/.test(password)
              ? "Password must contain at least one number"
              : !/[\W_]/.test(password)
                ? "Password must contain at least one special character"
                : "",

    confirmPassword: !confirmPassword.trim()
      ? "Confirm password is required"
      : confirmPassword !== password
        ? "Passwords do not match"
        : "",
  };

  return errors;
};
