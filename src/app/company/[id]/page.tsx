"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingPieChart } from "@/components/charts/pie-rating";
import { ReputationLineChart } from "@/components/charts/line-reputation";
import { TagsBarChart } from "@/components/charts/bar-tags";
import { useCompany, useCompanyReviews } from "@/hooks/useCompanies";
import { FraudScoreBadge } from "@/components/fraud-score-badge";
import { RatingStars } from "@/components/rating-stars";
import { ReviewCard } from "@/components/review-card";
import { ReviewForm } from "@/components/forms/review-form";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/loader";

export default function CompanyPage() {
  const params = useParams<{ id: string }>();
  const companyId = params.id;
  const { data: company, isLoading } = useCompany(companyId);
  const { data: reviews, isLoading: reviewsLoading } = useCompanyReviews(companyId);
  const tagsChart =
    company?.tags?.map((tag, index) => ({
      tag,
      count: (tag.length + index * 3) * 2,
    })) || [];

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Empresa</p>
                <h1 className="text-3xl font-semibold text-white">{company?.name}</h1>
                <p className="text-slate-400">{company?.description}</p>
              </div>
              {company && <FraudScoreBadge score={company.fraudScore} />}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Nota média</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-3 text-4xl font-semibold text-white">
                  {company?.avgRating.toFixed(1)}
                  <RatingStars rating={company?.avgRating || 0} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total de reviews</CardTitle>
                </CardHeader>
                <CardContent className="text-4xl font-semibold text-white">
                  {company?.totalReviews}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {company?.tags?.map((tag) => (
                    <Badge key={tag} className="bg-indigo-500/10 text-indigo-200">
                      #{tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Distribuição de notas</CardTitle>
            </CardHeader>
            <CardContent>
              <RatingPieChart
                data={
                  company?.ratingDistribution || [
                    { name: "5 estrelas", value: 50 },
                    { name: "4 estrelas", value: 30 },
                    { name: "3 estrelas", value: 10 },
                    { name: "2 estrelas", value: 5 },
                    { name: "1 estrela", value: 5 },
                  ]
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Score antifraude</CardTitle>
            </CardHeader>
            <CardContent>
              {company && <FraudScoreBadge score={company.fraudScore} />}
              <p className="mt-3 text-sm text-slate-400">
                Atualizado em tempo real conforme novos sinais e reviews são coletados.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="items-start justify-between">
            <div>
              <CardTitle>Evolução mensal</CardTitle>
              <p className="text-sm text-slate-400">Média de reputação mês a mês</p>
            </div>
          </CardHeader>
          <CardContent>
            <ReputationLineChart
              data={
                company?.monthlyReputation || [
                  { month: "Jan", rating: 4.1 },
                  { month: "Fev", rating: 4.2 },
                  { month: "Mar", rating: 4.3 },
                  { month: "Abr", rating: 4.5 },
                  { month: "Mai", rating: 4.6 },
                ]
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="items-start justify-between">
            <div>
              <CardTitle>Tags mais frequentes</CardTitle>
              <p className="text-sm text-slate-400">Temas citados nas últimas reviews</p>
            </div>
          </CardHeader>
            <CardContent>
              <TagsBarChart
                data={tagsChart}
              />
            </CardContent>
          </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="items-start justify-between">
              <div>
                <CardTitle>Reviews recentes</CardTitle>
                <p className="text-sm text-slate-400">Ordenadas da mais recente</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewsLoading && <Loader />}
              {reviews?.map((review) => <ReviewCard key={review.id} review={review} />)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publicar avaliação</CardTitle>
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
