import Image from "next/image";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name?: string;
  src?: string;
};

export function Avatar({ name, src, className }: AvatarProps) {
  const initials = name
    ?.split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt={name || "Avatar"}
        width={36}
        height={36}
        unoptimized
        className={cn("h-9 w-9 rounded-full object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-semibold text-white",
        className
      )}
    >
      {initials || "?"}
    </div>
  );
}
