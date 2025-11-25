import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-800/70",
        className
      )}
    />
  );
}
