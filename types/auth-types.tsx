export type createAccountType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
};

export type signInType = {
  email: string;
  password: string;
};

export type forgotPasswordType = {
  email: string;
};

export type OtpType = {
  otp: string;
};

export type newPasswordType = {
  password: string;
  confirmPassword: string;
};

export type formState = {
  status?: "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof createAccountType | "otp", string>>;
  profile?: {
    firstName: string;
    lastName: string;
    email: string;
    organizationName: string;
  };
};

export type SignInResponse = {
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
};
