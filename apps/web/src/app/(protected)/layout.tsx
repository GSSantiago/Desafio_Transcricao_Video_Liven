'use client'
import { ReactNode } from "react";

import Header from "@/components/header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
  <>
    <Header/>
    {children}
  </>
  );
}
