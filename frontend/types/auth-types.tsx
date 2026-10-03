export type adminUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type EditTypes = {
  instName: boolean;
  email: boolean;
  country: boolean;
  phoneNumber: boolean;
  description: boolean;
  password: boolean;
  confirmPassword: boolean;
};

export type createAccountRequest = {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type SigninTypes = {
  email: string;
  password: string;
};

export type ResetPasswordRequest = {
  password: string;
  confirmPassword: string;
  token?: string;
};

export type EmailVerificationRequest = {
  email: string;
};

export type User = {
  institutionName: string;
  email: string;
  logo: string;
  role: "ADMIN" | "USER" | "PRODUCER";
};

export type Role = "ADMIN" | "USER" | "PRODUCER";

export type SignInResponse = {
  message: "Sign in successful.";
  institution: {
    name: string;
    email: string;
    logo: string;
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    avatar: string;
  };
};
