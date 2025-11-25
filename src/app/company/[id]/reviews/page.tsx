"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewCard } from "@/components/review-card";
import { ReviewForm } from "@/components/forms/review-form";
import { useCompany, useCompanyReviews } from "@/hooks/useCompanies";
import { Loader } from "@/components/loader";

export default function CompanyReviewsPage() {
  const params = useParams<{ id: string }>();
  const companyId = params.id;
  const { data: company } = useCompany(companyId);
  const { data: reviews, isLoading } = useCompanyReviews(companyId);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
        <div>
          <p className="text-sm text-slate-400">Avaliações</p>
          <h1 className="text-3xl font-semibold text-white">
            {company?.name || "Empresa"} – Reviews
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Lista de avaliações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading && <Loader />}
              {reviews?.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Escreva a sua</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewForm companyId={companyId} />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
