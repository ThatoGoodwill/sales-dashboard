"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Filter,
  Sparkles,
  Users,
  Sun,    // ← ADD THIS
  Moon,   // ← ADD THIS (if not already there)
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const isDark = savedMode === "true";
    setIsDarkMode(isDark);

    // Apply to HTML
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());

    // Apply to HTML
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* Hero Section with Glass Effect */}
        <div className="glass-effect rounded-3xl p-8 md:p-12 text-center mb-16 card-hover">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 mb-6">
            <BarChart3 className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-gradient-blue text-5xl md:text-6xl font-bold mb-6">
            VS CODE Sales Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Interactive dashboard with advanced vscode sales data visualization
            for 2022-2024.
          </p>
       <div className="flex flex-col sm:flex-row items-center gap-6">
  {/* Launch Dashboard Button */}
  <Link
    href="/dashboard"
    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
  >
    <BarChart3 className="mr-3 h-5 w-5" />
    Launch Dashboard
    <ArrowRight className="ml-3 h-5 w-5" />
  </Link>

  {/* Divider for Desktop */}
  <div className="hidden sm:flex items-center">
    <div className="h-6 w-px bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500"></div>
    <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
    <div className="h-6 w-px bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500"></div>
  </div>

  {/* Dark Mode Button */}
  <button
    onClick={toggleDarkMode}
    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
  >
    {isDarkMode ? (
      <>
        <Sun className="mr-3 h-5 w-5 text-amber-500" />
        Switch to Light
      </>
    ) : (
      <>
        <Moon className="mr-3 h-5 w-5 text-blue-500" />
        Switch to Dark
      </>
    )}
  </button>
</div>
        </div>

        {/* Features Grid with Gradient Borders */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="border-2 border-blue-200 dark:border-blue-800/30 card-hover p-8 rounded-2xl">
            <div className="inline-block p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">
              Multi-Year Data Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Compare sales performance across 2022, 2023, and 2024 with
              interactive visualizations and growth metrics.
            </p>
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Real-time analytics
            </div>
          </div>

          <div className="border-2 border-blue-200 dark:border-blue-800/30 card-hover p-8 rounded-2xl">
            <div className="inline-block p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 mb-6">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400 mb-4">
              Interactive Charts
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Switch between bar, line, and pie charts for different insights
              with smooth animations.
            </p>
            <div className="flex items-center text-sm text-cyan-600 dark:text-cyan-400">
              <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mr-2"></span>
              Multiple visualization options
            </div>
          </div>

          <div className="border-2 border-blue-200 dark:border-blue-800/30 card-hover p-8 rounded-2xl">
            <div className="inline-block p-4 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 mb-6">
              <Filter className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">
              Custom Filters
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Set custom sales thresholds to filter and analyze data with
              precision and advanced controls.
            </p>
            <div className="flex items-center text-sm text-teal-600 dark:text-teal-400">
              <span className="inline-block w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              Dynamic data filtering
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="glass-effect rounded-3xl p-8 mb-16">
          <h2 className="text-gradient-blue text-3xl font-bold text-center mb-12">
            Dashboard Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">3+</div>
              <div className="text-gray-600 dark:text-gray-400">Years of Data</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-cyan-50 dark:bg-cyan-900/20">
              <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">6+</div>
              <div className="text-gray-600 dark:text-gray-400">Chart Types</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-green-50 dark:bg-green-900/20">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Real-time Updates</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="rounded-3xl p-12 mb-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Sales Analysis?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using our dashboard to make
              data-driven decisions and boost revenue.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105"
            >
              <Users className="mr-3 h-6 w-6" />
              Start Analyzing Now
            </Link>
          </div>

          {/* Footer Note */}
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Powered by Next.js 15, TypeScript, Tailwind CSS & Recharts
            </p>
            <p className="mt-2">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Fully responsive • Dark mode ready • Production optimized
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
