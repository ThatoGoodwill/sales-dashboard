"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SalesData } from "@/lib/data";

interface SalesLineChartProps {
  data: SalesData[];
}

export default function SalesLineChart({ data }: SalesLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]} />
        <Legend />
        <Line type="monotone" dataKey="2022" stroke="#8884d8" strokeWidth={2} name="2022 Sales" />
        <Line type="monotone" dataKey="2023" stroke="#82ca9d" strokeWidth={2} name="2023 Sales" />
        <Line type="monotone" dataKey="2024" stroke="#ffc658" strokeWidth={2} name="2024 Sales" />
      </LineChart>
    </ResponsiveContainer>
  );
}