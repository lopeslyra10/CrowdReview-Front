"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSuspiciousReviews, useRespondReview } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Loader } from "@/components/loader";

export default function AdminReviewsPage() {
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
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <h1 className="text-3xl font-semibold text-white">Avaliações suspeitas</h1>
        <Card>
          <CardHeader>
            <CardTitle>Revisão manual</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <Loader />}
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
                      <TD className="max-w-2xl text-slate-200">{review.comment}</TD>
                      <TD>
                        <Badge className="bg-rose-500/10 text-rose-200">Suspeita</Badge>
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
