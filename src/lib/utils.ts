import clsx from "clsx";

export function cn(...inputs: Array<string | undefined | null | false>) {
  return clsx(inputs);
}

export const formatNumber = (value: number, decimals = 0) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export const tagColors = [
  "bg-sky-500/10 text-sky-300 border border-sky-500/30",
  "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
  "bg-amber-500/10 text-amber-300 border border-amber-500/30",
  "bg-purple-500/10 text-purple-300 border border-purple-500/30",
  "bg-rose-500/10 text-rose-300 border border-rose-500/30",
];

export const pickTagColor = (tag: string) => {
  const idx = Math.abs(
    tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );
  return tagColors[idx % tagColors.length];
};
