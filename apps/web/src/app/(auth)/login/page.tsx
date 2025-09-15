'use client'
import { useRouter } from 'next/navigation'

import { z } from "zod"

import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/context/AuthUserContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
})

export default function Login() {
  const { signInWithEmailAndPassword } = useAuth();
  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const result = loginSchema.safeParse(data)

    if (!result.success) {
      return result.error.flatten().fieldErrors;
    }

    try {
      const user = await signInWithEmailAndPassword(data.email, data.password);
      console.log('Usuario Logado', user);
      router.push('/');

    } catch (error) {
      return { global: ["Ocorreu um erro inesperado. Tente novamente."] }
    } 
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}
