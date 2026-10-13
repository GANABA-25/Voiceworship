"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ReactNode } from "react";

type ToastProviderProps = {
  children: ReactNode;
};

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
