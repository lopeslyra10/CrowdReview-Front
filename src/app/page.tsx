import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { CompanyCard } from "@/components/company-card";

const featuredCompanies = [
  {
    id: "1",
    name: "NeonPay",
    category: "Fintech",
    avgRating: 4.8,
    totalReviews: 1843,
    fraudScore: 89,
    tags: ["finanças", "atendimento", "app"],
  },
  {
    id: "2",
    name: "SkyLog",
    category: "Logística",
    avgRating: 4.4,
    totalReviews: 1230,
    fraudScore: 76,
    tags: ["prazo", "rastreamento"],
  },
  {
    id: "3",
    name: "BlueMarket",
    category: "E-commerce",
    avgRating: 4.1,
    totalReviews: 923,
    fraudScore: 68,
    tags: ["entrega", "preço", "suporte"],
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12">
        <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-100">
              <Sparkles className="h-4 w-4" />
              Reputação transparente para empresas e consumidores
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              CrowdReview: avaliações reais, antifraude nativo e insights em tempo real.
            </h1>
            <p className="text-lg text-slate-300">
              Consumidores encontram empresas confiáveis. Times de CS e Risk monitoram
              reputação, suspeitas e respondem rápido com um dashboard estilo SaaS.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
              >
                Criar conta
              </Link>
              <Link
                href="/login"
                className="rounded-2xl border border-slate-800/80 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-slate-600 hover:bg-slate-900/60"
              >
                Acessar painel
              </Link>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Anti-fraude com score médio e refresh automático
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Volume de avaliações</p>
                <p className="text-4xl font-semibold text-white">+12.8k</p>
                <p className="text-xs text-emerald-300">+18% vs mês anterior</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-3">
                <div>
                  <p className="text-sm text-slate-400">Score antifraude médio</p>
                  <p className="text-2xl font-semibold text-white">82%</p>
                </div>
                <div className="text-xs text-emerald-300">+6% em 7 dias</div>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-3">
                <div>
                  <p className="text-sm text-slate-400">NPS estimado</p>
                  <p className="text-2xl font-semibold text-white">73</p>
                </div>
                <div className="text-xs text-cyan-300">+4 pontos</div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Descubra</p>
              <h2 className="text-2xl font-semibold text-white">Empresas em alta</h2>
            </div>
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-cyan-300 transition hover:text-white"
            >
              Ver dashboard →
            </Link>
          </div>
          <div className="card-grid">
            {featuredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
