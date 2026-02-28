import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ClientProviders from "@/components/ClientProviders";
import Layout from "@/components/Layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Akuntansi LKS",
  description: "Aplikasi akuntansi LKS modern untuk perhitungan persamaan dasar akuntansi",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Penting untuk UI mobile app-like
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>
          <TooltipProvider>
            <Layout>{children}</Layout>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
