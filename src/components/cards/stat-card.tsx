import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string | number;
  helper?: string;
  icon?: React.ReactNode;
  accent?: "indigo" | "cyan" | "emerald" | "amber" | "rose";
};

const accentMap: Record<NonNullable<Props["accent"]>, string> = {
  indigo: "from-indigo-500 to-cyan-500 text-indigo-50",
  cyan: "from-cyan-500 to-emerald-400 text-cyan-50",
  emerald: "from-emerald-500 to-teal-400 text-emerald-50",
  amber: "from-amber-500 to-orange-400 text-amber-50",
  rose: "from-rose-500 to-pink-500 text-rose-50",
};

export function StatCard({ label, value, helper, icon, accent = "indigo" }: Props) {
  return (
    <Card className="relative overflow-hidden border border-slate-800/80">
      <div
        className={cn(
          "absolute right-2 top-2 rounded-full bg-gradient-to-br px-3 py-2 text-xs font-semibold shadow-lg shadow-black/30",
          accentMap[accent]
        )}
      >
        {icon}
      </div>
      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      {helper && <p className="mt-2 text-sm text-slate-400">{helper}</p>}
    </Card>
  );
}
