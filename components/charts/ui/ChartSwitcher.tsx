"use client";

import { BarChart3, LineChart, PieChart } from "lucide-react";

type ChartType = "bar" | "line" | "pie";

interface ChartSwitcherProps {
  currentChart: ChartType;
  onChartChange: (type: ChartType) => void;
}

export default function ChartSwitcher({ currentChart, onChartChange }: ChartSwitcherProps) {
  const buttons = [
    { type: "bar" as ChartType, label: "Bar Chart", icon: <BarChart3 size={18} /> },
    { type: "line" as ChartType, label: "Line Chart", icon: <LineChart size={18} /> },
    { type: "pie" as ChartType, label: "Pie Chart", icon: <PieChart size={18} /> },
  ];

  return (
    <div className="flex space-x-2">
      {buttons.map((button) => (
        <button
          key={button.type}
          onClick={() => onChartChange(button.type)}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            currentChart === button.type
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span className="mr-2">{button.icon}</span>
          {button.label}
        </button>
      ))}
    </div>
  );
}