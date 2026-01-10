"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, DollarSign, Calendar, TrendingUp, BarChart3, Target } from "lucide-react";

// Dummy sales data
const salesData = [
  { month: "Jan", 2022: 12000, 2023: 15000, 2024: 18000 },
  { month: "Feb", 2022: 10000, 2023: 13000, 2024: 17000 },
  { month: "Mar", 2022: 9000, 2023: 12000, 2024: 16000 },
  { month: "Apr", 2022: 15000, 2023: 18000, 2024: 20000 },
  { month: "May", 2022: 14000, 2023: 16000, 2024: 19000 },
];

const yearlySummary = {
  2022: { total: 60000, growth: 0, average: 12000 },
  2023: { total: 74000, growth: 23, average: 14800 },
  2024: { total: 90000, growth: 21, average: 18000 },
};

type ChartType = "bar" | "line" | "pie";

const COLORS = ["#3b82f6", "#22c55e", "#8b5cf6"];

export default function Dashboard() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState(0);
  const [filteredData, setFilteredData] = useState(salesData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode toggle
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  useEffect(() => {
    setFilteredData(salesData.filter(d => d[2024] >= threshold));
  }, [threshold]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      localStorage.setItem("darkMode", (!prev).toString());
      document.documentElement.classList.toggle("dark");
      return !prev;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-blue-600 dark:text-blue-400">SalesView</h2>
        <nav className="flex-1 space-y-4">
          <button className="flex items-center gap-3 p-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 w-full">
            <BarChart3 className="w-5 h-5" /> Dashboard
          </button>
          <button className="flex items-center gap-3 p-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 w-full">
            <Users className="w-5 h-5" /> Customers
          </button>
          <button className="flex items-center gap-3 p-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 w-full">
            <Target className="w-5 h-5" /> Targets
          </button>
          <button className="flex items-center gap-3 p-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 w-full">
            <Calendar className="w-5 h-5" /> Reports
          </button>
        </nav>
        <button
          onClick={toggleDarkMode}
          className="mt-auto px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm font-medium"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last refresh: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(yearlySummary).map(([year, data], i) => (
            <div
              key={year}
              className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition relative overflow-hidden"
              style={{ background: `linear-gradient(to right, ${COLORS[i % COLORS.length]}33, ${COLORS[i % COLORS.length]}11)` }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Year {year}</p>
                  <h3 className="text-2xl font-bold mt-2">${data.total.toLocaleString()}</h3>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                Growth: {data.growth}%
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <div className="flex gap-4 mb-4">
            {["bar", "line", "pie"].map(type => (
              <button
                key={type}
                onClick={() => setChartType(type as ChartType)}
                className={`px-4 py-2 rounded ${
                  chartType === type ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <div className="h-96">
            {chartType === "bar" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData}>
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="2022" fill="#3b82f6" />
                  <Bar dataKey="2023" fill="#22c55e" />
                  <Bar dataKey="2024" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            )}
            {chartType === "line" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="2022" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="2023" stroke="#22c55e" />
                  <Line type="monotone" dataKey="2024" stroke="#8b5cf6" />
                </LineChart>
              </ResponsiveContainer>
            )}
            {chartType === "pie" && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "2022", value: yearlySummary[2022].total },
                      { name: "2023", value: yearlySummary[2023].total },
                      { name: "2024", value: yearlySummary[2024].total },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={index} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Sales Filter */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h3 className="text-xl font-bold mb-4">Filter by Sales Threshold</h3>
          <input
            type="range"
            min={0}
            max={20000}
            step={1000}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full h-2 rounded-lg accent-blue-600 mb-2"
          />
          <p className="text-sm">Showing months with sales ≥ ${threshold.toLocaleString()}</p>
        </div>

        {/* Sales Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 px-4">Month</th>
                <th className="py-2 px-4">2022 Sales</th>
                <th className="py-2 px-4">2023 Sales</th>
                <th className="py-2 px-4">2024 Sales</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(row => (
                <tr key={row.month} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="py-2 px-4">{row.month}</td>
                  <td className="py-2 px-4">${row[2022].toLocaleString()}</td>
                  <td className="py-2 px-4">${row[2023].toLocaleString()}</td>
                  <td className="py-2 px-4">${row[2024].toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
