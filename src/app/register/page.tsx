"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useRegister } from "@/hooks/useAuth";

const schema = z.object({
  username: z.string().min(3, "Informe seu usuário"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type Values = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((values) => {
    registerMutation.mutate(values, {
      onSuccess: () => router.push("/dashboard"),
    });
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Cadastro</p>
          <h1 className="text-4xl font-semibold leading-tight text-white">
            Junte-se à CrowdReview e monitore sua reputação com transparência.
          </h1>
          <p className="text-slate-300">
            Crie uma conta para acessar dashboard, métricas, responder avaliações e acompanhar o
            score antifraude médio da sua marca.
          </p>
        </div>

        <Card className="w-full max-w-md justify-self-end">
          <h2 className="mb-2 text-xl font-semibold text-white">Criar conta</h2>
          <p className="mb-6 text-sm text-slate-400">
            Já possui login?{" "}
            <Link href="/login" className="text-cyan-300 hover:text-white">
              Entrar
            </Link>
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Usuário</Label>
              <Input id="username" placeholder="seu_usuario" {...register("username")} />
              {errors.username && (
                <p className="text-sm text-rose-400">{errors.username.message}</p>
              )}
            </div>
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
            <Button
              type="submit"
              className="w-full justify-center"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Criando..." : "Cadastrar"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
