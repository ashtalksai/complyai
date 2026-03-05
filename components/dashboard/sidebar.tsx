"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ScanSearch,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/scanner", label: "Scanner", icon: ScanSearch },
  { href: "/dashboard/compliance", label: "Compliance", icon: ClipboardCheck },
  { href: "/dashboard/risks", label: "Risks", icon: AlertTriangle },
  { href: "/dashboard/policies", label: "Policies", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-[#0B1120] border-r border-slate-800">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-800">
        <Shield className="h-8 w-8 text-electric" />
        <span className="text-xl font-bold text-white">ComplyAI</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-electric/10 text-electric"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-slate-800">
        <Link
          href="/auth/signin"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
