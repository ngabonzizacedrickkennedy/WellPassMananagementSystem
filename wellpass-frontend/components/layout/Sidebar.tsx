'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Clock,
  ShieldCheck,
  Building2,
  Stethoscope,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MenuItem {
  label: string;
  icon: any;
  href: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    roles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'HR_MANAGER', 'RECEPTIONIST', 'SERVICE_PROVIDER_ADMIN'],
  },
  {
    label: 'Employees',
    icon: Users,
    href: '/employees',
    roles: ['COMPANY_ADMIN', 'HR_MANAGER', 'RECEPTIONIST'],
  },
  {
    label: 'Attendance',
    icon: Clock,
    href: '/attendance',
    roles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'HR_MANAGER', 'RECEPTIONIST'],
  },
  {
    label: 'Admissions',
    icon: ShieldCheck,
    href: '/admissions',
    roles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'RECEPTIONIST'],
  },
  {
    label: 'Companies',
    icon: Building2,
    href: '/companies',
    roles: ['SUPER_ADMIN', 'COMPANY_ADMIN'],
  },
  {
    label: 'Service Providers',
    icon: Stethoscope,
    href: '/service-providers',
    roles: ['SUPER_ADMIN', 'SERVICE_PROVIDER_ADMIN'],
  },
  {
    label: 'Billing',
    icon: CreditCard,
    href: '/billing',
    roles: ['SUPER_ADMIN', 'COMPANY_ADMIN'],
  },
  {
    label: 'Reports',
    icon: BarChart3,
    href: '/reports',
    roles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'HR_MANAGER'],
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    roles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'HR_MANAGER', 'RECEPTIONIST', 'SERVICE_PROVIDER_ADMIN'],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || '')
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  WellPass
                </h1>
                <p className="text-xs text-slate-400 mt-1">Management System</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {filteredMenuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50'
                        : 'hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <div
            className={`${
              isCollapsed ? '' : 'bg-slate-800/50'
            } rounded-xl p-3 mb-3`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user?.fullName}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.role?.replace('_', ' ')}</p>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className={`w-full ${
              isCollapsed ? 'px-0' : ''
            } text-red-400 hover:text-red-300 hover:bg-red-500/10 justify-start gap-3`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}