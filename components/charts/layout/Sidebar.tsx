"use client";

import { useState, useEffect } from "react";
import { 
  Home, 
  BarChart3, 
  PieChart, 
  LineChart,
  Settings, 
  FileText,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  ChevronRight,
  ChevronDown,
  Moon,
  Sun,
  X,
  Menu
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const isDark = savedMode === "true";
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard", badge: null },
    { icon: <BarChart3 size={20} />, label: "Sales Overview", path: "/sales", badge: "New" },
    { icon: <PieChart size={20} />, label: "Analytics", path: "/analytics", badge: null },
    { icon: <LineChart size={20} />, label: "Trends", path: "/trends", badge: null },
    { icon: <Users size={20} />, label: "Customers", path: "/customers", badge: "3" },
    { icon: <FileText size={20} />, label: "Reports", path: "/reports", badge: null },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings", badge: null },
  ];

  const quickStats = [
    { label: "Today's Revenue", value: "$42.8K", icon: <DollarSign size={16} />, change: "+12%" },
    { label: "Active Users", value: "1,284", icon: <Users size={16} />, change: "+8%" },
    { label: "Conversion Rate", value: "4.7%", icon: <TrendingUp size={16} />, change: "+2.1%" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg glass-effect shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar Container */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        fixed md:relative
        top-0 left-0
        h-screen
        w-72
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        flex flex-col
        transition-transform duration-300
        z-40
        shadow-xl md:shadow-none
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl gradient-bg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="gradient-text font-bold text-xl">SalesView</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Professional Dashboard</p>
              </div>
            </div>
            
            {/* Close button for mobile */}
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="space-y-3">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              Navigation
            </h2>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`
                    flex items-center justify-between
                    p-3 rounded-xl
                    transition-all duration-200
                    ${pathname === item.path 
                      ? 'gradient-bg text-white shadow-lg' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={pathname === item.path ? 'text-white' : 'text-gray-500'}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  
                  {item.badge && (
                    <span className={`
                      px-2 py-1 text-xs rounded-full font-semibold
                      ${pathname === item.path 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              Recent Activity
            </h2>
            <div className="space-y-2">
              {[
                { text: "Updated Q4 Sales Report", time: "2 hours ago" },
                { text: "New customer segment added", time: "Yesterday" },
                { text: "Monthly analytics generated", time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.text}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-white font-bold">TG</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Thato Goodwill</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun size={20} className="text-amber-500" />
              ) : (
                <Moon size={20} className="text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <p>Sales Dashboard v2.0</p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
