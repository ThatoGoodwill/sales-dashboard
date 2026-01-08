"use client";

import { useState } from "react";
import { 
  Home, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Settings, 
  FileText, 
  Folder, 
  Cloud, 
  Zap,
  ChevronRight,
  ChevronDown,
  Users,
  Bell,
  Search,
  Plus,
  Sparkles,
  Download,
  Upload,
  Share2,
  Filter,
  Eye,
  EyeOff,
  Moon,
  Sun
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  
  // Define the type for expandedSections
  type ExpandedSections = {
    navigation: boolean;
    analytics: boolean;
    settings: boolean;
    exports: boolean;
  };
  
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    navigation: true,
    analytics: true,
    settings: false,
    exports: false
  });
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  // FIXED: Add proper type for section parameter
  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


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

  const analyticsItems = [
    { icon: <BarChart3 size={18} />, text: "Sales Overview", count: "12", active: activeItem === "sales" },
    { icon: <LineChart size={18} />, text: "Revenue Trends", count: "8", active: activeItem === "revenue" },
    { icon: <PieChart size={18} />, text: "Category Analysis", count: "5", active: activeItem === "category" },
    { icon: <Users size={18} />, text: "Customer Insights", count: "24", active: activeItem === "customers" },
  ];

  const quickActions = [
    { icon: <Download size={16} />, text: "Export Data", color: "text-blue-400" },
    { icon: <Upload size={16} />, text: "Import CSV", color: "text-green-400" },
    { icon: <Share2 size={16} />, text: "Share Report", color: "text-purple-400" },
    { icon: <Filter size={16} />, text: "Advanced Filter", color: "text-amber-400" },
  ];

  return (
    <div className={`${collapsed ? 'w-20' : 'w-72'} glass-effect min-h-screen flex flex-col transition-all duration-300`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <div className={`flex items-center ${collapsed ? 'hidden' : 'block'}`}>
            <div className="p-2 rounded-xl gradient-bg mr-3">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="gradient-text font-bold text-xl">SalesView</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Analytics Pro</p>
            </div>
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* Search Bar */}
        {!collapsed && (
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search dashboards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin">
        {!collapsed && (
          <div className="mb-6">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-semibold">MAIN NAVIGATION</h2>
            <div className="space-y-1">
              <SidebarItem
                icon={<Home size={20} />}
                text="Dashboard Home"
                active={pathname === "/dashboard"}
                href="/dashboard"
                badge="New"
                collapsed={collapsed}
                onClick={() => setActiveItem("dashboard")}
              />
              <SidebarItem
                icon={<FileText size={20} />}
                text="Reports"
                active={pathname === "/reports"}
                href="/reports"
                count={24}
                collapsed={collapsed}
                onClick={() => setActiveItem("reports")}
              />
              <SidebarItem
                icon={<Settings size={20} />}
                text="Settings"
                active={pathname === "/settings"}
                href="/settings"
                collapsed={collapsed}
                onClick={() => setActiveItem("settings")}
              />
            </div>
          </div>
        )}

        {/* Analytics Section */}
        <div className="mb-6">
          {!collapsed && (
            <button
              onClick={() => toggleSection("analytics")}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <h2 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">ANALYTICS</h2>
              {expandedSections.analytics ? (
                <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600" />
              ) : (
                <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
              )}
            </button>
          )}
          
          {(!collapsed || collapsed && expandedSections.analytics) && expandedSections.analytics && (
            <div className="space-y-1">
              {analyticsItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  text={!collapsed ? item.text : ""}
                  active={item.active}
                  count={!collapsed ? item.count : undefined}
                  collapsed={collapsed}
                  onClick={() => setActiveItem(item.text.toLowerCase().split(' ')[0])}
                  className="justify-between"
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {!collapsed && (
          <div className="mb-6">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-semibold">QUICK ACTIONS</h2>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${action.color} bg-opacity-10`}>
                    {action.icon}
                  </div>
                  <span className="text-xs mt-2 text-gray-600 dark:text-gray-300">{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Files */}
        {!collapsed && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">RECENT FILES</h2>
              <span className="text-xs text-blue-500 cursor-pointer">View All</span>
            </div>
            <div className="space-y-2">
              <RecentFile name="Q4_Sales_Report.pdf" date="Today" />
              <RecentFile name="Customer_Analysis.xlsx" date="Yesterday" />
              <RecentFile name="Revenue_Forecast.pptx" date="2 days ago" />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {!collapsed ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-white font-bold">TG</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold">Thato Goodwill</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
              <Bell size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-sm">{darkMode ? 'Light' : 'Dark'}</span>
              </button>
              
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white font-bold">TG</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarItem = ({ 
  icon, 
  text, 
  active, 
  href, 
  badge, 
  count, 
  collapsed,
  onClick,
  className = ""
}: { 
  icon: React.ReactNode; 
  text: string; 
  active?: boolean; 
  href?: string;
  badge?: string;
  count?: string | number;
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  const content = (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-xl transition-all duration-200 cursor-pointer group ${active ? 'gradient-bg text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} ${className}`}
    >
      <div className={`${active ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
        {icon}
      </div>
      {!collapsed && (
        <>
          <span className={`ml-3 flex-1 ${active ? 'font-semibold' : ''}`}>{text}</span>
          {badge && (
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              {badge}
            </span>
          )}
          {count && (
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {count}
            </span>
          )}
        </>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        {content}
      </Link>
    );
  }

  return content;
};

const RecentFile = ({ name, date }: { name: string; date: string }) => (
  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-3">
      <FileText size={14} className="text-blue-600 dark:text-blue-400" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium truncate">{name}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
    <Eye size={14} className="text-gray-400" />
  </div>
);

export default Sidebar;
