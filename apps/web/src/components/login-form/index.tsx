'use client'

import Link from "next/link"

import { useActionState } from "react";

import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"

type ActionResult = {
  errors?: Record<string, string[]>
}

type LoginFormProps = {
  action: (state: ActionResult, formData: FormData) => Promise<ActionResult>
}

export function LoginForm({ action }: LoginFormProps) {
  const [state, formAction ] = useActionState(action, {})

  return (
    <div className={cn("flex flex-col gap-6")} >
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <Link href="/" className="underline">Transcriptor 3000</Link>
          </CardTitle>
          <CardDescription className="text-center">
           Digite suas credenciais nos campos abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <div>
                  <Input
                    id="email"
                    name="email"
                    placeholder="liven@example.com"
                    required
                  />
                  {state.errors?.email && (
                    <span className="text-xs px-1 text-red-500">{state.errors.email[0]}</span>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <div>
                  <Input id="password" type="password" name="password" required />
                  {state.errors?.password && (
                    <span className="text-xs px-1 text-red-500">{state.errors.password[0]}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="secondary" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -6 32 32">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login com o Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Não possui uma conta?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Registre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
