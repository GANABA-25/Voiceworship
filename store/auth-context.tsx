"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { SignInResponse, Role } from "@/types/auth-types";

type AuthContextTypes = {
  userData: SignInResponse | null;
  role: Role | null;
  isAuthenticated: boolean;
  login: (user: SignInResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<SignInResponse | null>(null);

  const login = useCallback((user: SignInResponse) => {
    setUserData(user);
  }, []);

  const logout = useCallback(async () => {
    try {
      //   await logOut();
    } catch (error) {
      console.error(error);
    } finally {
      setUserData(null);
      router.replace("/");
    }
  }, [router]);

  const value = useMemo(
    () => ({
      userData,
      role: userData?.user?.role ?? null,
      isAuthenticated: !!userData,
      login,
      logout,
    }),
    [userData, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
