'use client'
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { ArrowLeft } from "lucide-react"

const registerSchema = z
  .object({
    name: z.string().min(2, "Digite seu nome completo"),
    email: z.string().email("Digite um e-mail válido"),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter ao menos uma letra minúscula")
      .regex(/[0-9]/, "Deve conter ao menos um número")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Deve conter ao menos um caractere especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

export type RegisterSchema = z.infer<typeof registerSchema>

type RegisterFormProps = {
  onSubmit: (data: RegisterSchema) => void | Promise<void>
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6")}
    >
      <div className="w-full mb-4">
        <div className="flex flex-row items-start gap-2 text-center">
          <div>
            <Link href="/login">
              <ArrowLeft className="w-5 h-5" color="white" />
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-tight">Crie sua conta</h1>
            <p className="text-sm text-balance leading-tight">
              Preencha os campos abaixo para se registrar
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Nome</Label>
          <div>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-sm text-red-500 px-1">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <div>
            <Input
              id="email"
              type="email"
              placeholder="liven@example.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm text-red-500 px-1">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <div>
            <Input
              id="password"
              type="password"
              placeholder="Sua senha"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-500 px-1">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirme a senha</Label>
          <div>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500 px-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrar"}
        </Button>
      </div>
    </form>
  )
}
