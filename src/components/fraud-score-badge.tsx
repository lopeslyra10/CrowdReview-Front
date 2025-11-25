import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function FraudScoreBadge({ score }: { score: number }) {
  const level =
    score > 80 ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/40" : score > 50
      ? "bg-amber-500/15 text-amber-200 border-amber-500/40"
      : "bg-rose-500/15 text-rose-200 border-rose-500/40";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        level
      )}
    >
      <ShieldAlert className="h-4 w-4" />
      Score antifraude {score.toFixed(0)}%
    </div>
  );
}
