'use client'
import { ReactNode } from "react";

import Header from "@/components/header";

import { AuthUserProvider } from "@/context/AuthUserContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
  <>
    <AuthUserProvider>
      <Header/>
      {children}
    </AuthUserProvider>
  </>
  );
}
