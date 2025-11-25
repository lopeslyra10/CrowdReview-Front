"use client";

import { Navbar } from "@/components/navbar";
import { StatCard } from "@/components/cards/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDashboardMetrics, useRespondReview, useSuspiciousReviews } from "@/hooks/useDashboard";
import { formatNumber } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MessageCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const { data: metrics } = useDashboardMetrics();
  const { data: suspicious, isLoading } = useSuspiciousReviews();
  const respond = useRespondReview();

  const handleRespond = (id: string) => {
    const status = window.prompt("Status (approved/rejected)", "approved");
    if (!status) return;
    respond.mutate({ id, status });
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="flex items-center gap-2 text-slate-400">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <span>Modo Admin</span>
        </div>
        <h1 className="text-3xl font-semibold text-white">Dashboard do Admin</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard
            label="Reviews totais"
            value={metrics ? formatNumber(metrics.totalReviews) : "1.2k"}
            helper="Últimos 30 dias"
            accent="indigo"
          />
          <StatCard
            label="Suspeitas"
            value={metrics ? metrics.suspicious : 32}
            helper="Priorização antifraude"
            accent="rose"
          />
          <StatCard label="NPS" value={metrics?.nps ?? 72} helper="Meta 75" accent="emerald" />
          <StatCard
            label="Reputação"
            value={metrics?.reputation ?? 4.6}
            helper="Média ponderada"
            accent="cyan"
          />
        </div>

        <Card>
          <CardHeader className="items-start justify-between">
            <div>
              <CardTitle>Avaliações suspeitas</CardTitle>
              <p className="text-sm text-slate-400">
                Detectadas pelo motor antifraude. Responda ou marque como revisada.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading && <Loader />}
            <div className="overflow-x-auto">
              <Table>
                <THead>
                  <TR>
                    <TH>Usuário</TH>
                    <TH>Comentário</TH>
                    <TH>Risco</TH>
                    <TH></TH>
                  </TR>
                </THead>
                <TBody>
                  {suspicious?.map((review) => (
                    <TR key={review.id}>
                      <TD>
                        <div className="font-semibold text-white">{review.user.name}</div>
                        <div className="text-xs text-slate-500">Nota {review.rating}</div>
                      </TD>
                      <TD className="max-w-2xl text-slate-200">{review.comment}</TD>
                      <TD>
                        <Badge className="bg-rose-500/10 text-rose-200">
                          Risco {review.risk || review.fraudScore || 0}%
                        </Badge>
                      </TD>
                      <TD className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<MessageCircle className="h-4 w-4" />}
                          onClick={() => handleRespond(review.id)}
                        >
                          Responder
                        </Button>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
