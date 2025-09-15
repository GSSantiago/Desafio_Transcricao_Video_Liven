'use client'
import { ReactNode } from "react";
import { AuthUserProvider } from "../../context/AuthUserContext";

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthUserProvider>{children}</AuthUserProvider>;
}
