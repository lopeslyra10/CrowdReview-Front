import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CrowdReview",
  description: "Reputação transparente com reviews confiáveis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <Providers>
          <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-930 to-slate-900">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,.1),transparent_30%),radial-gradient(circle_at_40%_60%,rgba(16,185,129,.08),transparent_30%)]" />
            <div className="relative z-10">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
