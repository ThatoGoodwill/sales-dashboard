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
import { TrendingUp, DollarSign, Calendar, BarChart3 } from "lucide-react";

type ChartType = "bar" | "line" | "pie";

export default function DashboardPage() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState(0);
  const [filteredData, setFilteredData] = useState(salesData);

  useEffect(() => {
    setFilteredData(filterByThreshold(salesData, threshold));
  }, [threshold]);

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600">Visualize and analyze sales performance across years</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Revenue 2024</p>
              <h3 className="text-3xl font-bold mt-2">{formatCurrency(yearlySummary[2024].total)}</h3>
            </div>
            <DollarSign className="h-12 w-12 opacity-80" />
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span>{yearlySummary[2024].growth.toFixed(1)}% growth from 2023</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Monthly Average</p>
              <h3 className="text-3xl font-bold mt-2">{formatCurrency(yearlySummary[2024].average)}</h3>
            </div>
            <BarChart3 className="h-12 w-12 opacity-80" />
          </div>
          <div className="mt-4">
            <span>Consistent growth across all months</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Performance Period</p>
              <h3 className="text-3xl font-bold mt-2">2022-2024</h3>
            </div>
            <Calendar className="h-12 w-12 opacity-80" />
          </div>
          <div className="mt-4">
            <span>3 years of sales data analysis</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2">
          <Card title="Monthly Sales Analysis">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <ChartSwitcher currentChart={chartType} onChartChange={setChartType} />
                <div className="text-sm text-gray-500">
                  Showing data filtered by: ${threshold.toLocaleString()}+
                </div>
              </div>
              <div className="h-[400px]">{renderChart()}</div>
            </div>
          </Card>
        </div>

        {/* Filters and Summary */}
        <div className="space-y-6">
          <Card title="Data Filters">
            <FilterInput threshold={threshold} onThresholdChange={setThreshold} />
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Filter Info:</p>
              <p className="text-xs text-gray-500">
                Adjust the slider to filter months with sales above a certain threshold. 
                This helps identify high-performing periods.
              </p>
            </div>
          </Card>

          <Card title="Yearly Summary">
            <div className="space-y-4">
              {Object.entries(yearlySummary).map(([year, data]) => (
                <div key={year} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-semibold text-gray-900">{year}</span>
                    <p className="text-sm text-gray-500">Total Sales</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{formatCurrency(data.total)}</div>
                    <div className={`text-sm ${Number(year) > 2022 ? "text-green-600" : "text-gray-500"}`}>
                      {Number(year) > 2022 ? `+${data.growth}% growth` : "Base year"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Data Table */}
      <Card title="Monthly Sales Data">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">2022 Sales</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">2023 Sales</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">2024 Sales</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Growth (22-24)</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row) => {
                const growth = ((row[2024] - row[2022]) / row[2022]) * 100;
                return (
                  <tr key={row.month} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{row.month}</td>
                    <td className="text-right py-3 px-4">{formatCurrency(row[2022])}</td>
                    <td className="text-right py-3 px-4">{formatCurrency(row[2023])}</td>
                    <td className="text-right py-3 px-4">{formatCurrency(row[2024])}</td>
                    <td className={`text-right py-3 px-4 font-semibold ${growth > 0 ? "text-green-600" : "text-red-600"}`}>
                      {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}