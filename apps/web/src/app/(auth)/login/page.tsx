'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

import { LoginForm, LoginSchema } from "@/components/login-form"
import { useAuth } from "@/context/AuthUserContext";

export default function Login() {
  const { signInWithEmailAndPassword } = useAuth();
  const router = useRouter();

  async function handleLogin(data : LoginSchema ) {

    try {
      await signInWithEmailAndPassword(data.email, data.password);

      toast.success('Login realizado com sucesso!');
      router.push('/');

    } catch {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
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
