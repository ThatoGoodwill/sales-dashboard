"use client";

import { Home, BarChart3, LineChart, PieChart, Settings, FileText, Folder, Cloud, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8 p-4">
        <h1 className="text-xl font-bold flex items-center">
          <BarChart3 className="mr-2" />
          VS Code Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">Editing evolved</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Start</h2>
        <ul className="space-y-1">
          <SidebarItem icon={<FileText size={16} />} text="New File..." active={false} />
          <SidebarItem icon={<Folder size={16} />} text="Open File..." active={true} />
          <SidebarItem icon={<Folder size={16} />} text="Open Folder..." active={false} />
          <SidebarItem icon={<Cloud size={16} />} text="Connect to..." active={false} />
          <SidebarItem icon={<Zap size={16} />} text="Generate New Workspace..." active={false} />
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Navigation</h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className={`flex items-center p-2 rounded ${pathname === "/" ? "bg-blue-600" : "hover:bg-gray-800"}`}
            >
              <Home size={18} className="mr-3" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center p-2 rounded ${pathname === "/dashboard" ? "bg-blue-600" : "hover:bg-gray-800"}`}
            >
              <BarChart3 size={18} className="mr-3" />
              Dashboard
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Walkthroughs</h2>
        <div className="bg-gray-800 p-3 rounded text-sm">
          <p className="font-medium">Get started with VS Code</p>
          <p className="text-gray-400 text-xs mt-1">Customize your editor, learn the basics</p>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="bg-gray-800 p-3 rounded mb-3">
          <p className="font-medium">GitHub Copilot (Updated)</p>
        </div>
        
        <div className="bg-gray-800 p-3 rounded">
          <p className="font-medium">Build with Agent</p>
          <p className="text-gray-400 text-xs mt-1">All responses may be inaccurate</p>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active }: { icon: React.ReactNode; text: string; active: boolean }) => (
  <div className={`flex items-center p-2 rounded ${active ? "bg-blue-600" : "hover:bg-gray-800"}`}>
    {icon}
    <span className="ml-3">{text}</span>
    {active && <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>}
  </div>
);

export default Sidebar;