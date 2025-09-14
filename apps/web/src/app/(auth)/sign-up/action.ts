"use server"

import { z } from "zod"
import { createUser } from "@/services/api/users"

const signUpSchema = z.object({
	name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
	email: z.string().email({ message: "Email inválido" }),
	password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
	confirmPassword: z.string().min(6, { message: "Confirme sua senha" })
}).refine((data) => data.password === data.confirmPassword, {
	message: "As senhas não coincidem",
	path: ["confirmPassword"],
})

export async function signUp(_prevState: unknown, formData: FormData) {
	try {
	    const data = Object.fromEntries(formData.entries());

		const result = signUpSchema.safeParse(data)

		if (!result.success) {
			return { errors: result.error.flatten().fieldErrors }
		}

        await createUser({
            name: result.data.name,
            email: result.data.email,
            password: result.data.password
        });

        return {}
	} catch (error: any) {
        if (error.response?.data?.error) {
            return { errors: { global: [error.response.data.error] } }
        }

		return { errors: { global: ["Ocorreu um erro inesperado. Tente novamente."] } }
	}
}
