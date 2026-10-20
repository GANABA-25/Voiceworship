"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/actions/signout";
import { SignInResponse } from "@/types/auth-types";

type AuthContextTypes = {
  userData: SignInResponse | null;
  isAuthenticated: boolean;
  login: (user: SignInResponse) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<SignInResponse | null>(null);

  const login = (user: SignInResponse) => {
    setUserData(user);
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    } finally {
      setUserData(null);
      router.replace("/auth?mode=signin");
      router.refresh();
    }
  };

  const value = {
    userData,
    isAuthenticated: !!userData,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
