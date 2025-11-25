"use client";

import { useState } from "react";
import { LogOut, Moon, ShieldCheck, Sun, User as UserIcon } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { useTheme } from "@/app/providers";
import { useLogout } from "@/hooks/useAuth";
import Link from "next/link";
import { User } from "@/types";

type Props = {
  user?: User;
};

export function UserMenu({ user }: Props) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const logout = useLogout();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 shadow-lg shadow-black/20 transition hover:border-slate-600"
      >
        <Avatar name={user?.name} />
        <div className="hidden text-left sm:block">
          <p className="text-xs text-slate-400">Conectado</p>
          <p className="text-sm font-semibold">{user?.name || "Visitante"}</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="mb-3 flex items-center gap-3">
            <Avatar name={user?.name} />
            <div>
              <p className="text-sm font-semibold">{user?.name || "Visitante"}</p>
              <p className="text-xs text-slate-400">{user?.email || "sem email"}</p>
            </div>
          </div>
          <div className="space-y-2">
            <MenuItem
              href="/dashboard"
              icon={<UserIcon className="h-4 w-4" />}
              label="Meu painel"
              onClick={() => setOpen(false)}
            />
            {user?.role === "admin" && (
              <MenuItem
                href="/admin/dashboard"
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Admin"
                onClick={() => setOpen(false)}
              />
            )}
            <Button
              variant="secondary"
              className="w-full justify-between"
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              icon={theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            >
              {theme === "dark" ? "Modo claro" : "Modo escuro"}
            </Button>
            <Button
              variant="danger"
              className="w-full justify-between"
              onClick={() => logout.mutate()}
              icon={<LogOut className="h-4 w-4" />}
            >
              Sair
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-sm text-slate-100 transition hover:border-slate-700 hover:bg-slate-900/60"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </Link>
  );
}
