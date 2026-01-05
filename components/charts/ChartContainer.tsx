"use client";

import { ReactNode } from "react";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
}

export default function ChartContainer({ title, children }: ChartContainerProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="h-80">{children}</div>
    </div>
  );
}