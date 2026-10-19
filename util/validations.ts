import { createAccountType } from "@/types/auth-types";

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
