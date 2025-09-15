'use client'
import Link from "next/link"

import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"

import { ArrowLeft } from "lucide-react"
import { useActionState } from "react"

type ActionResult = {
  errors?: Record<string, string[]>
}

type RegisterFormProps = {
  action: (state: ActionResult, formData: FormData) => Promise<ActionResult>
}


export function RegisterForm({ action }: RegisterFormProps) {
    const [state, formAction ] = useActionState(action, {})
  
  return (
    <form className={cn("flex flex-col gap-6")} action={formAction}>
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
            <Input id="name" type="text" name="name" placeholder="Seu nome" required className="bg-white" />
            {state.errors?.name && (
                <span className="text-sm text-red-500 px-1 shadow-sm text-shadow-white">{state.errors.name.join(', ')}</span>
            )}
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <div>
            <Input id="email" name="email" placeholder="liven@example.com" required className="bg-white" />
            {state.errors?.email && (
                <span className="text-sm text-red-500 px-1 shadow-sm text-shadow-white">{state.errors.email.join(', ')}</span>
            )}
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <div>
            <Input id="password" type="password" name="password" placeholder="Sua senha" required className="bg-white" />
            {state.errors?.password && (
                <span className="text-sm text-red-500 px-1 shadow-sm text-shadow-white">{state.errors.password.join(', ')}</span>
            )}
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirme a senha</Label>
          <div>
            <Input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirme sua senha" required className="bg-white" />
            {state.errors?.confirmPassword && (
                <span className="text-sm text-red-500 px-1 shadow-sm text-shadow-white">{state.errors.confirmPassword.join(', ')}</span>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full">
          Registrar
        </Button>
      </div>
    </form>
  )
}
