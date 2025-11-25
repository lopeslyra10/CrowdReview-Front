"use client";

import { Company } from "@/types";
import { formatNumber } from "@/lib/utils";
import { FraudScoreBadge } from "./fraud-score-badge";
import { RatingStars } from "./rating-stars";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  company: Company;
};

export function CompanyCard({ company }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="group relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60" />
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  className="h-10 w-10 rounded-xl object-cover"
                  width={40}
                  height={40}
                  unoptimized
                />
              ) : (
                <Building2 className="h-5 w-5 text-indigo-300" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{company.name}</CardTitle>
              <p className="text-xs text-slate-400">{company.category || "Empresa"}</p>
            </div>
          </div>
          <FraudScoreBadge score={company.fraudScore} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <RatingStars rating={company.avgRating} />
              <span className="font-semibold">{company.avgRating.toFixed(1)}</span>
              <span className="text-xs text-slate-500">
                ({formatNumber(company.totalReviews)} avaliacoes)
              </span>
            </div>
          </div>

          {company.tags && (
            <div className="flex flex-wrap gap-2">
              {company.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} className="bg-indigo-500/10 text-indigo-200">
                  <MapPin className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Link
            href={`/company/${company.id}`}
            className="flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-white"
          >
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
