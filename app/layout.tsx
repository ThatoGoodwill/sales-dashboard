import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/charts/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "Sales analytics dashboard with interactive charts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 dark:bg-zinc-950`}>
        <div className="flex min-h-screen">

          {/* Sidebar */}
          <Sidebar />

          {/* Main app area */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}
