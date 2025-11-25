import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDashboardMetrics,
  getSuspiciousReviews,
  respondToReview,
} from "@/lib/api";
import { DashboardMetrics, SuspiciousReview } from "@/types";

export function useDashboardMetrics() {
  return useQuery<DashboardMetrics>({
    queryKey: ["dashboard", "metrics"],
    queryFn: getDashboardMetrics,
  });
}

export function useSuspiciousReviews() {
  return useQuery<SuspiciousReview[]>({
    queryKey: ["admin", "suspicious-reviews"],
    queryFn: getSuspiciousReviews,
  });
}

export function useRespondReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      respondToReview(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "suspicious-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });
}
