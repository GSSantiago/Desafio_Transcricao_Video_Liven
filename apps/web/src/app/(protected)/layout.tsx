"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/header";
import { AuthUserProvider, useAuth } from "@/context/AuthUserContext";
import { LoadingSpinner } from "@repo/ui/components/loading";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthProviderWrapper>
      <Header />
      {children}
    </AuthProviderWrapper>
  );
}

function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthUserProvider>
      <AuthConsumer>{children}</AuthConsumer>
    </AuthUserProvider>
  );
}

function AuthConsumer({ children }: { children: ReactNode }) {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser?.uid) {
      router.replace("/login");
    }
  }, [loading, authUser, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!authUser?.uid) return null;

  return <>{children}</>;
}
