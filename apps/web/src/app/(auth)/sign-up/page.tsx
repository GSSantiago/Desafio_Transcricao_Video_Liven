"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import { GalleryVerticalEnd } from "lucide-react";

import BgImage from "public/voice-to-text.png";

import { RegisterForm, RegisterSchema } from "@/components/register-form";
import { createUser } from "@/services/api/users";
import { useAuth } from "@/context/AuthUserContext";
import { LoadingSpinner } from "@repo/ui/components/loading";

export default function RegisterPage() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && authUser?.uid) {
      router.replace("/");
    }
  }, [authUser, loading, router]);

  async function signUp(data: RegisterSchema) {
    try {
      await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Conta registrada com sucesso!");
      router.push("/login");
    } catch {
      toast.error("Erro ao criar a conta. Tente novamente mais tarde.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (authUser?.uid) return null;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Liven - Transcrição de vídeo.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm onSubmit={signUp} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={BgImage}
          alt="Voice to Text image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
