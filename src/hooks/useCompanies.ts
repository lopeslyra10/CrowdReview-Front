import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  getCompanies,
  getCompany,
  getCompanyReviews,
} from "@/lib/api";
import { Company, Review } from "@/types";

export function useCompanies() {
  return useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
}

export function useCompany(id?: string) {
  return useQuery<Company>({
    queryKey: ["company", id],
    queryFn: () => getCompany(id || ""),
    enabled: !!id,
  });
}

export function useCompanyReviews(id?: string) {
  return useQuery<Review[]>({
    queryKey: ["company", id, "reviews"],
    queryFn: () => getCompanyReviews(id || ""),
    enabled: !!id,
  });
}

export function useCreateReview(companyId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      companyId: string;
      rating: number;
      comment: string;
    }) =>
      createReview({
        companyId: companyId || payload.companyId,
        rating: payload.rating,
        comment: payload.comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
      queryClient.invalidateQueries({ queryKey: ["company", companyId, "reviews"] });
    },
  });
}
