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

export type resetPasswordEmailType = {
  email: string;
};

export type OtpType = {
  otp: string;
};

export type resetPasswordType = {
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

// export type adminUserRequest = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   password: string;
//   confirmPassword: string;
// };

// export type EditTypes = {
//   instName: boolean;
//   email: boolean;
//   country: boolean;
//   phoneNumber: boolean;
//   description: boolean;
//   password: boolean;
//   confirmPassword: boolean;
// };

// export type SigninTypes = {
//   email: string;
//   password: string;
// };

// export type ResetPasswordRequest = {
//   password: string;
//   confirmPassword: string;
//   token?: string;
// };

// export type EmailVerificationRequest = {
//   email: string;
// };

// export type User = {
//   institutionName: string;
//   email: string;
//   logo: string;
//   role: "ADMIN" | "USER" | "PRODUCER";
// };

// export type Role = "ADMIN" | "USER" | "PRODUCER";

// export type SignInResponse = {
//   message: "Sign in successful.";
//   institution: {
//     name: string;
//     email: string;
//     logo: string;
//   };
//   user: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     role: Role;
//     avatar: string;
//   };
// };
