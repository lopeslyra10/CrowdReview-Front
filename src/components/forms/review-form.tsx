"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RatingStars } from "../rating-stars";
import { useCreateReview } from "@/hooks/useCompanies";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Descreva um pouco mais sua experiência."),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

type Props = {
  companyId: string;
  onSubmitted?: () => void;
};

export function ReviewForm({ companyId, onSubmitted }: Props) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5, comment: "" },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const mutation = useCreateReview(companyId);

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(
      { companyId, ...values },
      {
        onSuccess: () => {
          reset({ rating: 5, comment: "" });
          onSubmitted?.();
        },
      }
    );
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label>Avaliação</Label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="h-2 w-full accent-indigo-500"
              />
              <RatingStars rating={field.value} />
              <span className="text-sm text-slate-200">{field.value}.0</span>
            </div>
          )}
        />
      </div>

      <div>
        <Label htmlFor="comment">Comentário</Label>
        <Textarea
          id="comment"
          rows={4}
          placeholder="Conte como foi sua experiência..."
          {...register("comment")}
        />
        {errors.comment && <p className="text-sm text-rose-400">{errors.comment.message}</p>}
      </div>

      <Button type="submit" className="w-full justify-center" disabled={mutation.isPending}>
        {mutation.isPending ? "Enviando..." : "Publicar avaliação"}
      </Button>
    </form>
  );
}
