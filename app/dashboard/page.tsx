"use client";

import { useState, useEffect } from "react";
import Card from "@/components/charts/ui/Card";
import FilterInput from "@/components/charts/ui/FilterInput";
import ChartSwitcher from "@/components/charts/ui/ChartSwitcher";
import SalesBarChart from "@/components/charts/SalesBarChart";
import SalesLineChart from "@/components/charts/SalesLineChart";
import SalesPieChart from "@/components/charts/SalesPieChart";
import { salesData, yearlySummary, filterByThreshold } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, DollarSign, Calendar, BarChart3, Users, Target, ShoppingCart } from "lucide-react";

type ChartType = "bar" | "line" | "pie";

export default function DashboardPage() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState(0);
  const [filteredData, setFilteredData] = useState(salesData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const isDark = savedMode === "true";
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    setFilteredData(filterByThreshold(salesData, threshold));
  }, [threshold]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <SalesBarChart data={filteredData} />;
      case "line":
        return <SalesLineChart data={filteredData} />;
      case "pie":
        return <SalesPieChart data={filteredData} />;
      default:
        return <SalesBarChart data={filteredData} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-purple-50'} p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="gradient-text text-4xl font-bold">SalesView</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Visualize and analyze VS Code sales performance across years</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[2024, 2024, 2022].map((year, idx) => (
            <div key={idx} className="gradient-border-card card-hover p-6 rounded-2xl mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${idx === 0 ? 'text-blue-100 dark:text-blue-200' : idx === 1 ? 'text-green-100 dark:text-green-200' : 'text-purple-100 dark:text-purple-200'}`}>
                    {idx === 0 ? 'Total Revenue 2024' : idx === 1 ? 'Monthly Average' : 'Performance Period'}
                  </p>
                  <h3 className={`text-3xl font-bold mt-2 ${idx === 0 ? 'gradient-text' : idx === 1 ? 'gradient-text-alt' : 'gradient-text'}`}>
                    {idx === 0 ? formatCurrency(yearlySummary[2024].total) : idx === 1 ? formatCurrency(yearlySummary[2024].average) : '2022-2024'}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl shadow-lg ${idx === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : idx === 1 ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-purple-500 to-purple-600'}`}>
                  {idx === 0 ? <DollarSign className="h-8 w-8 text-white" /> : idx === 1 ? <BarChart3 className="h-8 w-8 text-white" /> : <Calendar className="h-8 w-8 text-white" />}
                </div>
              </div>
              <div className={`flex items-center mt-6 ${idx < 2 ? '' : 'mb-2'}`}>
                {idx < 2 && <TrendingUp className="h-5 w-5 text-green-400 mr-2" />}
                {idx === 0 && <span className="text-gray-300 dark:text-gray-400 text-sm">{yearlySummary[2024].growth.toFixed(1)}% growth from 2023</span>}
                {idx === 1 && <span className="text-gray-300 dark:text-gray-400 text-sm">Consistent growth across all months</span>}
                {idx === 2 && <span className="text-gray-300 dark:text-gray-400 text-sm">3 years of sales data analysis</span>}
              </div>
              <div className="mt-4 h-2 bg-gray-700 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full ${idx === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : idx === 1 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-purple-500 to-purple-600'}`} 
                     style={{ width: idx === 0 ? '85%' : idx === 1 ? '78%' : '100%' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-6 card-hover mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="gradient-text text-2xl font-bold">Monthly Sales Analysis</h2>
                  <p className="text-gray-600 dark:text-gray-300">Interactive visualization of sales performance</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing data filtered by: <span className="font-semibold text-blue-600 dark:text-blue-400">${threshold.toLocaleString()}+</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {["bar", "line", "pie"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setChartType(type as ChartType)}
                        className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                          chartType === type
                            ? 'gradient-bg text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {type === "bar" && <BarChart3 className="w-4 h-4" />}
                        {type === "line" && <TrendingUp className="w-4 h-4" />}
                        {type === "pie" && <Target className="w-4 h-4" />}
                        {type.charAt(0).toUpperCase() + type.slice(1)} Chart
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-[400px] rounded-xl overflow-hidden bg-white/50 dark:bg-gray-800/50 p-4">
                  {renderChart()}
                </div>
              </div>
            </div>
          </div>

          {/* Filters & Summary */}
          <div className="space-y-8">
            <div className="glass-effect rounded-2xl p-6 card-hover mb-6">
              <h3 className="gradient-text-alt text-xl font-bold mb-4">Data Filters</h3>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sales Threshold</label>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    ${threshold.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="10000"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-gradient"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>$0</span>
                  <span>$100K</span>
                  <span>$200K</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter Information</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Adjust the slider to filter months with sales above a certain threshold. 
                  This helps identify high-performing periods.
                </p>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6 card-hover mb-6">
              <h3 className="gradient-text text-xl font-bold mb-4">Yearly Summary</h3>
              <div className="space-y-4">
                {Object.entries(yearlySummary).map(([year, data]) => (
                  <div key={year} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white text-lg">{year}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Sales</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white text-lg">{formatCurrency(data.total)}</div>
                      <div className={`text-sm font-semibold ${Number(year) > 2022 ? "text-green-500" : "text-gray-500"}`}>
                        {Number(year) > 2022 ? `+${data.growth}% growth` : "Base year"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="glass-effect rounded-2xl p-6 card-hover mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="gradient-text text-2xl font-bold">Monthly Sales Data</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredData.length} of {salesData.length} months
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Month</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">2022 Sales</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">2023 Sales</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">2024 Sales</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">Growth (22-24)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => {
                  const growth = ((row[2024] - row[2022]) / row[2022]) * 100;
                  return (
                    <tr 
                      key={row.month} 
                      className={`border-b border-gray-100 dark:border-gray-800 ${index % 2 === 0 ? 'bg-white/50 dark:bg-gray-900/50' : 'bg-gray-50/50 dark:bg-gray-800/50'} hover:bg-blue-50/50 dark:hover:bg-gray-800 transition-colors`}
                    >
                      <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{row.month}</td>
                      <td className="text-right py-4 px-6 text-gray-700 dark:text-gray-300">{formatCurrency(row[2022])}</td>
                      <td className="text-right py-4 px-6 text-gray-700 dark:text-gray-300">{formatCurrency(row[2023])}</td>
                      <td className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">{formatCurrency(row[2024])}</td>
                      <td className={`text-right py-4 px-6 font-bold ${growth > 0 ? "text-green-500" : "text-red-500"}`}>
                        <div className="flex items-center justify-end">
                          {growth > 0 ? <TrendingUp className="w-4 h-4 mr-2" /> : null}
                          {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 gradient-bg rounded-full animate-pulse"></span>
            Sales Dashboard built with Next.js, TypeScript, Tailwind CSS & Recharts
          </p>
          <p className="mt-2">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Real-time data updates • Last refresh: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}
