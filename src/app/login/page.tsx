"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLogin } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const login = useLogin();

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onSuccess: () => router.push(redirect),
    });
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
            CrowdReview
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white">
            Entre e acompanhe reputação, reviews e score antifraude em tempo real.
          </h1>
          <p className="text-slate-300">
            Use suas credenciais para acessar o dashboard. Cookies HttpOnly cuidam do JWT e
            o refresh acontece automaticamente via React Query.
          </p>
        </div>

        <Card className="w-full max-w-md justify-self-end">
          <h2 className="mb-2 text-xl font-semibold text-white">Acessar</h2>
          <p className="mb-6 text-sm text-slate-400">
            Use seu email e senha. Sem conta?{" "}
            <Link href="/register" className="text-cyan-300 hover:text-white">
              Cadastre-se
            </Link>
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="voce@empresa.com" {...register("email")} />
              {errors.email && <p className="text-sm text-rose-400">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="********" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-rose-400">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full justify-center" disabled={login.isPending}>
              {login.isPending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
