import { HTMLAttributes, TableHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full border-collapse text-sm", className)} {...props} />;
}

export function THead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("text-slate-400", className)} {...props} />;
}

export function TBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-slate-800/80", className)} {...props} />;
}

export function TR({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("transition-colors hover:bg-slate-900/60", className)}
      {...props}
    />
  );
}

export function TH({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400",
        className
      )}
      {...props}
    />
  );
}

export function TD({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("py-3 text-slate-100 align-top", className)} {...props} />
  );
}
