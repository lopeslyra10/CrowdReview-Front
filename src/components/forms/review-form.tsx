"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RatingStars } from "../rating-stars";
import { Badge } from "../ui/badge";
import { PlusCircle, Tag } from "lucide-react";
import { useCreateReview } from "@/hooks/useCompanies";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Descreva um pouco mais sua experiência."),
  tags: z.array(z.string()).min(1, "Adicione pelo menos uma tag"),
  location: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

type Props = {
  companyId: string;
  onSubmitted?: () => void;
};

export function ReviewForm({ companyId, onSubmitted }: Props) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5, comment: "", tags: ["experiencia"], images: [] },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const mutation = useCreateReview(companyId);

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(
      { companyId, ...values },
      {
        onSuccess: () => {
          reset({ rating: 5, comment: "", tags: ["experiencia"], images: [] });
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
        {errors.comment && (
          <p className="text-sm text-rose-400">{errors.comment.message}</p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label>Tags</Label>
          <button
            type="button"
            onClick={() => append("nova-tag")}
            className="flex items-center gap-2 text-sm text-cyan-300 transition hover:text-white"
          >
            <PlusCircle className="h-4 w-4" />
            Adicionar tag
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {fields.map((field, index) => (
            <Badge key={field.id} className="bg-slate-800 text-slate-100">
              <Tag className="mr-1 h-3 w-3" />
              <input
                className="bg-transparent text-xs outline-none"
                {...register(`tags.${index}` as const)}
              />
              <button
                type="button"
                className="ml-2 text-slate-400 hover:text-rose-400"
                onClick={() => remove(index)}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
        {errors.tags && <p className="text-sm text-rose-400">{errors.tags.message}</p>}
      </div>

      <div>
        <Label htmlFor="location">Localização (opcional)</Label>
        <Input
          id="location"
          placeholder="Cidade, País"
          {...register("location")}
        />
      </div>

      <div>
        <Label>Imagens (URLs, opcional)</Label>
        <Input
          placeholder="https://example.com/foto1.jpg, https://example.com/foto2.jpg"
          onChange={(e) =>
            setValue(
              "images",
              e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            )
          }
        />
        <p className="mt-1 text-xs text-slate-500">
          Use links ou deixe vazio. Upload real pode ser integrado ao backend.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full justify-center"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Enviando..." : "Publicar avaliação"}
      </Button>
    </form>
  );
}
