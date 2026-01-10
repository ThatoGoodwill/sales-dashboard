"use client";

import { Home, BarChart3, LineChart, PieChart, Users, FileText, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      
      {/* Brand */}
      <div className="mb-8 p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold flex items-center">
          <BarChart3 className="mr-2 text-blue-500" />
          SalesView
        </h1>
        <p className="text-gray-400 text-sm mt-1">Analytics Dashboard</p>
      </div>

      {/* Main Navigation */}
      <div className="mb-6">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
          Main
        </h2>
        <ul className="space-y-1">
          <NavItem icon={<Home size={18} />} text="Overview" href="/" pathname={pathname} />
          <NavItem icon={<BarChart3 size={18} />} text="Dashboard" href="/dashboard" pathname={pathname} />
          <NavItem icon={<LineChart size={18} />} text="Revenue" href="/revenue" pathname={pathname} />
          <NavItem icon={<PieChart size={18} />} text="Reports" href="/reports" pathname={pathname} />
        </ul>
      </div>

      {/* Management */}
      <div className="mb-6">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
          Management
        </h2>
        <ul className="space-y-1">
          <NavItem icon={<Users size={18} />} text="Customers" href="/customers" pathname={pathname} />
          <NavItem icon={<FileText size={18} />} text="Invoices" href="/invoices" pathname={pathname} />
        </ul>
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Bottom */}
      <div className="border-t border-gray-800 pt-4">
        <NavItem icon={<Settings size={18} />} text="Settings" href="/settings" pathname={pathname} />
        <button className="flex items-center w-full p-2 rounded hover:bg-red-600 mt-2 text-gray-300 hover:text-white">
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

const NavItem = ({
  icon,
  text,
  href,
  pathname,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  pathname: string;
}) => {
  const active = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center p-2 rounded transition ${
          active ? "bg-blue-600 text-white" : "hover:bg-gray-800 text-gray-300"
        }`}
      >
        {icon}
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
};

export default Sidebar;
