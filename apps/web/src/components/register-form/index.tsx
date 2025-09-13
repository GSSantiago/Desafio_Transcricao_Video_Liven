import Link from "next/link"

import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"

import { ArrowLeft } from "lucide-react"


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="w-full mb-4">
      
      <div className="flex flex-row items-start gap-2 text-center">
        <div>
            <Link href="/login">
                <ArrowLeft className="w-5 h-5" color="white" />
            </Link>
        </div>
        <div>
            <h1 className="text-2xl font-bold text-white leading-tight">Crie sua conta</h1>
            <p className="text-sm text-balance text-white leading-tight">
            Preencha os campos abaixo para se registrar
            </p>
        </div>
      </div>
       </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name" className="text-white">Nome</Label>
          <Input id="name" type="text" placeholder="Seu nome" required className="bg-white" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input id="email" type="email" placeholder="liven@example.com" required className="bg-white" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password" className="text-white">Senha</Label>
          <Input id="password" type="password" placeholder="Sua senha" required className="bg-white" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword" className="text-white">Confirme a senha</Label>
          <Input id="confirmPassword" type="password" placeholder="Confirme sua senha" required className="bg-white" />
        </div>
        <Button type="submit" className="w-full">
          Registrar
        </Button>
      </div>
    </form>
  )
}
