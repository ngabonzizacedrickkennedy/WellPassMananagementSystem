'use client';

import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Bell, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center flex-1 gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search employees, admissions..."
              className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-xs text-slate-500">You have 3 unread messages</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="p-4 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">New employee registered</p>
                    <p className="text-xs text-slate-500">John Doe joined Marketing team</p>
                    <p className="text-xs text-slate-400 mt-1">5 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">Admission verified</p>
                    <p className="text-xs text-slate-500">Jane Smith checked in at FitLife Gym</p>
                    <p className="text-xs text-slate-400 mt-1">15 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">Monthly report ready</p>
                    <p className="text-xs text-slate-500">December attendance report is available</p>
                    <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" className="w-full text-sm">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <p className="text-xs text-slate-500">
                    {user?.role?.replace('_', ' ')}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-3 border-b">
                <p className="font-medium text-sm">{user?.fullName}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}