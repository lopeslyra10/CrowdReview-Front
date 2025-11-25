import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: ReactNode;
  size?: Size;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40",
  secondary:
    "bg-slate-800 text-slate-100 border border-slate-700 hover:border-slate-500",
  ghost: "bg-transparent text-slate-200 hover:bg-slate-800/60",
  outline:
    "border border-slate-700 text-slate-100 hover:border-slate-500 hover:bg-slate-900/60",
  danger: "bg-rose-600 text-white hover:bg-rose-500",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export function Button({
  children,
  className,
  variant = "primary",
  icon,
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
