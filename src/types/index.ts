export type Role = "user" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type Company = {
  id: string;
  name: string;
  logo?: string;
  category?: string;
  description?: string;
  avgRating: number;
  totalReviews: number;
  fraudScore: number;
  tags?: string[];
  monthlyReputation?: Array<{ month: string; rating: number }>;
  ratingDistribution?: Array<{ name: string; value: number }>;
};

export type Review = {
  id: string;
  companyId: string;
  user: { id: string; name: string };
  rating: number;
  comment: string;
  tags: string[];
  createdAt: string;
  location?: string;
  images?: string[];
  fraudScore?: number;
  status?: "approved" | "pending" | "rejected" | "flagged";
  response?: string;
};

export type SuspiciousReview = Review & {
  reason: string;
  risk: number;
};

export type DashboardMetrics = {
  totalReviews: number;
  suspicious: number;
  nps: number;
  reputation: number;
  weeklyTrend: Array<{ week: string; value: number }>;
  topTags: Array<{ tag: string; count: number }>;
  distribution: Array<{ name: string; value: number }>;
};
