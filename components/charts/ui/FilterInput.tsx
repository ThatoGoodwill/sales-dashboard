"use client";

interface FilterInputProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
}

export default function FilterInput({ threshold, onThresholdChange }: FilterInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Filter by Minimum Sales: <span className="font-bold">${threshold.toLocaleString()}</span>
      </label>
      <input
        type="range"
        min="0"
        max="100000"
        step="1000"
        value={threshold}
        onChange={(e) => onThresholdChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>$0</span>
        <span>$50,000</span>
        <span>$100,000</span>
      </div>
    </div>
  );
}