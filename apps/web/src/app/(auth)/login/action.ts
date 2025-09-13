"use server"

import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
})

export async function login(_prevState: unknown, formData: FormData) {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    }

    const result = loginSchema.safeParse(data)

    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors }
    }

    // TODO: Firebase SDK

    return {};
  } catch (_error) {
    return { errors: { global: ["Ocorreu um erro inesperado. Tente novamente."] } }
  }
}
