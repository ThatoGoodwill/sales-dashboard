"use client";

import { useState, useEffect } from "react";
import SalesBarChart from "@/components/charts/SalesBarChart";
import SalesLineChart from "@/components/charts/SalesLineChart";
import SalesPieChart from "@/components/charts/SalesPieChart";
import { salesData, yearlySummary, filterByThreshold } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, DollarSign, Calendar, BarChart3, Target } from "lucide-react";

type ChartType = "bar" | "line" | "pie";

export default function DashboardPage() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState(0);
  const [filteredData, setFilteredData] = useState(salesData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  useEffect(() => {
    setFilteredData(filterByThreshold(salesData, threshold));
  }, [threshold]);

  const renderChart = () => {
    if (chartType === "line") return <SalesLineChart data={filteredData} />;
    if (chartType === "pie") return <SalesPieChart data={filteredData} />;
    return <SalesBarChart data={filteredData} />;
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-950 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Sales Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            VS Code sales performance from 2022 – 2024
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Revenue 2024</p>
                <h3 className="text-2xl font-semibold mt-1">
                  {formatCurrency(yearlySummary[2024].total)}
                </h3>
              </div>
              <DollarSign className="text-blue-600" />
            </div>
            <p className="text-sm text-green-600 mt-3">
              +{yearlySummary[2024].growth}% from 2023
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Monthly Average</p>
            <h3 className="text-2xl font-semibold mt-1">
              {formatCurrency(yearlySummary[2024].average)}
            </h3>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Data Period</p>
            <h3 className="text-2xl font-semibold mt-1">2022 – 2024</h3>
          </div>
        </div>

        {/* Chart + Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Monthly Sales</h2>
              <div className="flex gap-2">
                {["bar", "line", "pie"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type as ChartType)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                      chartType === type
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[380px]">
              {renderChart()}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-sm">
            <p className="font-semibold mb-3">Sales Filter</p>
            <p className="text-sm text-gray-500 mb-2">
              Minimum sales: ${threshold.toLocaleString()}
            </p>
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Monthly Sales Data</h2>
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Month</th>
                <th className="text-right py-2">2022</th>
                <th className="text-right py-2">2023</th>
                <th className="text-right py-2">2024</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.month} className="border-b last:border-0">
                  <td className="py-2">{row.month}</td>
                  <td className="text-right py-2">{formatCurrency(row[2022])}</td>
                  <td className="text-right py-2">{formatCurrency(row[2023])}</td>
                  <td className="text-right py-2 font-semibold">
                    {formatCurrency(row[2024])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
