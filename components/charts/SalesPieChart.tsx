"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SalesData } from "@/lib/data";

interface SalesPieChartProps {
  data: SalesData[];
}

export default function SalesPieChart({ data }: SalesPieChartProps) {
  // Transform data for pie chart (total sales per year)
  const yearlyTotals = [
    {
      name: "2022",
      value: data.reduce((sum, item) => sum + item["2022"], 0),
      color: "#8884d8",
    },
    {
      name: "2023",
      value: data.reduce((sum, item) => sum + item["2023"], 0),
      color: "#82ca9d",
    },
    {
      name: "2024",
      value: data.reduce((sum, item) => sum + item["2024"], 0),
      color: "#ffc658",
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={yearlyTotals}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}k`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {yearlyTotals.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Total Sales"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}