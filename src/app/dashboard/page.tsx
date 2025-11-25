"use client";

import { Navbar } from "@/components/navbar";
import { StatCard } from "@/components/cards/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingPieChart } from "@/components/charts/pie-rating";
import { ReputationLineChart } from "@/components/charts/line-reputation";
import { TagsBarChart } from "@/components/charts/bar-tags";
import { CompanyCard } from "@/components/company-card";
import { ReviewCard } from "@/components/review-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useCompanies } from "@/hooks/useCompanies";
import { useDashboardMetrics, useSuspiciousReviews } from "@/hooks/useDashboard";
import { formatNumber } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { data: companies, isLoading: companiesLoading } = useCompanies();
  const { data: suspicious, isLoading: suspiciousLoading } = useSuspiciousReviews();

  const distribution =
    metrics?.distribution ||
    [
      { name: "5 estrelas", value: 48 },
      { name: "4 estrelas", value: 27 },
      { name: "3 estrelas", value: 13 },
      { name: "2 estrelas", value: 7 },
      { name: "1 estrela", value: 5 },
    ];

  const trend =
    metrics?.weeklyTrend ||
    [
      { week: "01-07", value: 4.2 },
      { week: "08-14", value: 4.4 },
      { week: "15-21", value: 4.5 },
      { week: "22-28", value: 4.6 },
    ];

  const topTags =
    metrics?.topTags ||
    [
      { tag: "atendimento", count: 120 },
      { tag: "prazo", count: 95 },
      { tag: "entrega", count: 83 },
      { tag: "app", count: 70 },
      { tag: "preço", count: 60 },
    ];

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-slate-400">Visão geral</p>
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        </div>

        {metricsLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard
              label="Total de reviews"
              value={metrics ? formatNumber(metrics.totalReviews) : "1.2k"}
              helper="+8% esta semana"
              accent="indigo"
            />
            <StatCard
              label="Suspeitas"
              value={metrics ? metrics.suspicious : 32}
              helper="Score antifraude médio 82%"
              accent="rose"
            />
            <StatCard label="NPS" value={metrics ? metrics.nps : 72} helper="Meta 75" accent="emerald" />
            <StatCard
              label="Reputação"
              value={metrics ? metrics.reputation : 4.6}
              helper="Média geral"
              accent="cyan"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="items-start justify-between">
              <div>
                <CardTitle>Evolução da reputação</CardTitle>
                <p className="text-sm text-slate-400">Nota média ao longo das semanas</p>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-200">Live</Badge>
            </CardHeader>
            <CardContent>
              <ReputationLineChart
                data={trend.map((item) => ({ month: item.week, rating: item.value }))}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição de notas</CardTitle>
            </CardHeader>
            <CardContent>
              <RatingPieChart data={distribution} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="items-start justify-between">
              <div>
                <CardTitle>Tags mais citadas</CardTitle>
                <p className="text-sm text-slate-400">Monitoramento de temas quentes</p>
              </div>
            </CardHeader>
            <CardContent>
              <TagsBarChart data={topTags} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="items-start justify-between">
              <div>
                <CardTitle>Últimas reviews</CardTitle>
                <p className="text-sm text-slate-400">Moderadas pelo anti-fraude</p>
              </div>
              <Badge className="bg-indigo-500/10 text-indigo-200">Auto</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {suspiciousLoading && <Loader />}
              {suspicious?.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} compact />
              ))}
            </CardContent>
          </Card>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Empresas</h2>
            <Button variant="outline">Nova empresa</Button>
          </div>
          {companiesLoading && <Loader />}
          <div className="card-grid">
            {companies?.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-400" />
            <h2 className="text-xl font-semibold text-white">Avaliações suspeitas</h2>
          </div>
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <THead>
                  <TR>
                    <TH>Usuário</TH>
                    <TH>Comentário</TH>
                    <TH>Status</TH>
                    <TH></TH>
                  </TR>
                </THead>
                <TBody>
                  {suspicious?.map((review) => (
                    <TR key={review.id}>
                      <TD>
                        <div className="font-semibold text-white">{review.user.name}</div>
                        <div className="text-xs text-slate-500">{review.rating} estrelas</div>
                      </TD>
                      <TD className="max-w-xl text-slate-200">{review.comment}</TD>
                      <TD>
                        <Badge className="bg-rose-500/10 text-rose-200">Suspeita</Badge>
                      </TD>
                      <TD className="text-right">
                        <Button variant="outline" size="sm">
                          Responder
                        </Button>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}
