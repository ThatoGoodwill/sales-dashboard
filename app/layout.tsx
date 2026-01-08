// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FixedDarkModeToggle from "@/components/charts/FixedDarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sales Analytics Dashboard",
  description: "Interactive sales analytics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FixedDarkModeToggle />
        {children}
      </body>
    </html>
  );
}
