"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Sparkles } from "lucide-react";
import { UserMenu } from "./user-menu";
import { useCurrentUser } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/company/1", label: "Empresas" },
  { href: "/admin/dashboard", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/30">
            <Shield className="h-5 w-5" />
          </div>
          CrowdReview
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white",
                pathname.startsWith(link.href) && "bg-slate-900 text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/company/1/reviews"
            className="hidden items-center gap-2 rounded-xl border border-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-900/60 md:flex"
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Nova review
          </Link>
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
