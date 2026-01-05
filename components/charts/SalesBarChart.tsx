"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SalesData } from "@/lib/data";

interface SalesBarChartProps {
  data: SalesData[];
}

export default function SalesBarChart({ data }: SalesBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]} />
        <Legend />
        <Bar dataKey="2022" fill="#8884d8" name="2022 Sales" />
        <Bar dataKey="2023" fill="#82ca9d" name="2023 Sales" />
        <Bar dataKey="2024" fill="#ffc658" name="2024 Sales" />
      </BarChart>
    </ResponsiveContainer>
  );
}