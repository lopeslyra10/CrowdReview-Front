import { Calendar, Image as ImageIcon, MapPin } from "lucide-react";
import { Review } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { RatingStars } from "./rating-stars";
import { Badge } from "./ui/badge";
import { FraudScoreBadge } from "./fraud-score-badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { pickTagColor } from "@/lib/utils";

type Props = {
  review: Review;
  compact?: boolean;
};

export function ReviewCard({ review, compact }: Props) {
  const createdAt = review.createdAt ? new Date(review.createdAt) : new Date();
  const comment = review.comment || "";

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-cyan-500/0" />
      <CardHeader className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <RatingStars rating={review.rating} />
            <p className="text-sm font-semibold text-slate-200">{review.user.name}</p>
            {review.location && (
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin className="h-3 w-3" />
                {review.location}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            <Calendar className="mr-1 inline h-3 w-3" />
            {format(createdAt, "dd MMM yyyy", { locale: ptBR })}
          </p>
        </div>
        {review.fraudScore && <FraudScoreBadge score={review.fraudScore} />}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-slate-200">
          {compact && comment.length > 180 ? comment.slice(0, 180) + "..." : comment}
        </p>

        {review.tags && (
          <div className="flex flex-wrap gap-2">
            {review.tags.map((tag) => (
              <Badge key={tag} className={pickTagColor(tag)}>
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {review.images && review.images.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ImageIcon className="h-4 w-4" />
            {review.images.length} anexo(s)
          </div>
        )}

        {review.response && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-emerald-100">
            <p className="font-semibold text-emerald-200">Resposta da empresa</p>
            <p className="text-emerald-100/90">{review.response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
