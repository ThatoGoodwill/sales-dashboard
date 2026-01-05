import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sales Analytics Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Interactive dashboard with sales data visualization for 2022-2024
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-lg mb-2">Multi-Year Data</h3>
          <p className="text-gray-600">
            Compare sales performance across 2022, 2023, and 2024
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-lg mb-2">Interactive Charts</h3>
          <p className="text-gray-600">
            Switch between bar, line, and pie charts for different insights
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-lg mb-2">Custom Filters</h3>
          <p className="text-gray-600">
            Set custom sales thresholds to filter and analyze data
          </p>
        </div>
      </div>
    </div>
  );
}