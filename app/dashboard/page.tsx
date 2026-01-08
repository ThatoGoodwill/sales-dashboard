// app/dashboard/page.tsx - UPDATED WITH NEW STYLES
'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  ShoppingCart,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  Settings,
  FileText,
  LineChart as LineChartIcon,
  Users,
  Target,
  Sparkles
} from 'lucide-react';

// Dashboard Data
const monthlySalesData = [
  { month: 'Jan', sales: 125000, orders: 1420 },
  { month: 'Feb', sales: 132000, orders: 1480 },
  { month: 'Mar', sales: 118000, orders: 1350 },
  { month: 'Apr', sales: 145000, orders: 1620 },
  { month: 'May', sales: 152000, orders: 1680 },
  { month: 'Jun', sales: 148000, orders: 1580 },
  { month: 'Jul', sales: 162000, orders: 1750 },
  { month: 'Aug', sales: 158000, orders: 1720 },
  { month: 'Sep', sales: 142000, orders: 1550 },
  { month: 'Oct', sales: 168000, orders: 1850 },
  { month: 'Nov', sales: 175000, orders: 1920 },
  { month: 'Dec', sales: 182000, orders: 1980 }
];

const yearlyComparison = [
  { year: '2022', sales: 1350000, growth: 22.1 },
  { year: '2023', sales: 1680000, growth: 24.4 },
  { year: '2024', sales: 2090000, growth: 24.4 }
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#3b82f6' },
  { name: 'Clothing', value: 25, color: '#8b5cf6' },
  { name: 'Home Goods', value: 20, color: '#10b981' },
  { name: 'Books', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#ef4444' }
];

const sidebarItems = [
  { icon: BarChart3, label: 'Dashboard', active: true },
  { icon: LineChartIcon, label: 'Analytics' },
  { icon: FileText, label: 'Reports' },
  { icon: Settings, label: 'Settings' }
];

const statCards = [
  {
    title: 'Total Sales',
    value: '$1.46M',
    change: '+29.4%',
    icon: DollarSign,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    trend: 'up'
  },
  {
    title: 'Total Orders',
    value: '1,850',
    change: '+29.4%',
    icon: ShoppingCart,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    trend: 'up'
  },
  {
    title: 'Net Profit',
    value: '$262K',
    change: '+37.0%',
    icon: TrendingUp,
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    trend: 'up'
  },
  {
    title: 'Avg. Order Value',
    value: '$67',
    change: '+5.2%',
    icon: Target,
    color: 'bg-gradient-to-br from-amber-500 to-amber-600',
    trend: 'up'
  }
];

const chartButtons = [
  { label: 'Min Sales', icon: BarChart3, type: 'bar' },
  { label: 'Ui Bar', icon: BarChart3, type: 'bar' },
  { label: 'Line', icon: LineChartIcon, type: 'line' },
  { label: 'Pie', icon: PieChartIcon, type: 'pie' }
];

export default function SalesDashboard() {
  const [activeChart, setActiveChart] = React.useState('line');
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const renderChart = () => {
    switch (activeChart) {
      case 'bar':
        return (
          <BarChart data={monthlySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="month" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
            <Tooltip contentStyle={{ 
              backgroundColor: isDarkMode ? '#1f2937' : 'white',
              borderColor: isDarkMode ? '#374151' : '#e5e7eb',
              borderRadius: '0.5rem'
            }} />
            <Legend />
            <Bar 
              dataKey="sales" 
              fill="#3b82f6" 
              name="Sales ($)" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="orders" 
              fill="#8b5cf6" 
              name="Orders" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ 
              backgroundColor: isDarkMode ? '#1f2937' : 'white',
              borderColor: isDarkMode ? '#374151' : '#e5e7eb',
              borderRadius: '0.5rem'
            }} />
            <Legend />
          </PieChart>
        );
      default:
        return (
          <LineChart data={monthlySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="month" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
            <Tooltip contentStyle={{ 
              backgroundColor: isDarkMode ? '#1f2937' : 'white',
              borderColor: isDarkMode ? '#374151' : '#e5e7eb',
              borderRadius: '0.5rem'
            }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#3b82f6' }}
              activeDot={{ r: 6, fill: '#2563eb' }}
              name="Sales ($)"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#8b5cf6' }}
              name="Orders"
            />
          </LineChart>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="gradient-text text-4xl font-bold">SalesView</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Analytics Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="btn-gradient flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with glass effect */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="glass-effect rounded-2xl p-6 mb-8 card-hover">
              <h2 className="gradient-text-alt text-xl font-bold mb-2">Sales Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                Monitor your sales performance across years
              </p>
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300 ${
                      item.active
                        ? 'gradient-bg text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Yearly Comparison Table */}
            <div className="gradient-border-card card-hover mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-4 text-gray-500 dark:text-gray-400 font-medium"></th>
                      {yearlyComparison.map((year) => (
                        <th key={year.year} className="text-center py-4 px-4">
                          <span className="gradient-text font-bold text-lg">{year.year}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-5 px-4 text-gray-700 dark:text-gray-300 font-semibold">Total Sales</td>
                      {yearlyComparison.map((year) => (
                        <td key={year.year} className="text-center py-5 px-4">
                          <div className="font-bold text-gray-900 dark:text-white text-xl">
                            ${(year.sales / 1000000).toFixed(2)}M
                          </div>
                          <div className="text-green-600 dark:text-green-400 text-sm font-semibold mt-1">
                            +{year.growth}%
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stat Cards with gradients */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((card) => (
                <div key={card.title} className="glass-effect rounded-2xl p-6 card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${card.color} shadow-lg`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      card.trend === 'up' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                    {card.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                  <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${card.color.replace('bg-gradient-to-br', 'bg-gradient-to-r')}`}
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="glass-effect rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="gradient-text text-2xl font-bold">Monthly Sales Overview</h2>
                  <p className="text-gray-600 dark:text-gray-300">Sales performance for 2024</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {chartButtons.map((button) => (
                    <button
                      key={button.label}
                      onClick={() => setActiveChart(button.type)}
                      className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                        activeChart === button.type
                          ? 'gradient-bg text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <button.icon className="w-4 h-4" />
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </div>
              
              {/* Chart stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">$160K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Peak Month</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">$120K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg Monthly</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">+37.0%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Growth Rate</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">$67</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Order Value</div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 gradient-bg rounded-full animate-pulse"></span>
                Dashboard built with Next.js 15, TypeScript, Tailwind CSS & Recharts
              </p>
              <p className="mt-2">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Data updates in real-time • Last updated: Today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
