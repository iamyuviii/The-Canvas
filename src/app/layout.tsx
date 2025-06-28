import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Design Tool",
  description: "Create and export your designs easily.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <Modals />
          {children}
        </Providers>
      </body>
    </html>
  );
}
