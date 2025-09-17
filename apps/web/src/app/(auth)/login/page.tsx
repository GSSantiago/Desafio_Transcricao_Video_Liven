"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { LoginForm, LoginSchema } from "@/components/login-form";
import { useAuth } from "@/context/AuthUserContext";
import { LoadingSpinner } from "@repo/ui/components/loading";

export default function Login() {
  const { authUser, signInWithEmailAndPassword, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && authUser?.uid) {
      router.replace("/");
    }
  }, [authUser, loading, router]);

  async function handleLogin(data: LoginSchema) {
    try {
      await signInWithEmailAndPassword(data.email, data.password);

      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch {
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  }

  if (loading || authUser?.uid) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner/>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
