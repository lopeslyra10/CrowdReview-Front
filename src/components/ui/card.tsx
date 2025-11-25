import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel relative overflow-hidden p-6 shadow-xl shadow-black/10 transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn("mb-4 flex items-start justify-between", className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
  return <h3 className={cn("text-base font-semibold text-slate-100", className)}>{children}</h3>;
}

export function CardDescription({ className, children }: CardProps) {
  return <p className={cn("text-sm text-slate-400", className)}>{children}</p>;
}

export function CardContent({ className, children }: CardProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}
