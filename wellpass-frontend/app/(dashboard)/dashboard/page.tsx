'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  Users,
  Clock,
  ShieldCheck,
  CreditCard,
  Building2,
  UserPlus,
  FileSpreadsheet,
  UserCheck,
  BarChart3,
  Stethoscope,
  DollarSign,
  Target,
  Award,
  TrendingUp,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const getQuickActions = () => {
    switch (user?.role) {
      case 'SUPER_ADMIN':
        return [
          { title: 'Add Company', description: 'Create new company', icon: Building2, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', href: '/companies/new' },
          { title: 'Add Provider', description: 'Register service provider', icon: Stethoscope, iconBg: 'bg-green-100', iconColor: 'text-green-600', href: '/service-providers/new' },
          { title: 'View Reports', description: 'Analytics and insights', icon: BarChart3, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', href: '/reports' },
          { title: 'Billing Overview', description: 'Financial dashboard', icon: CreditCard, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', href: '/billing' },
        ];
      case 'COMPANY_ADMIN':
        return [
          { title: 'Add Employee', description: 'Register new employee', icon: UserPlus, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', href: '/employees/new' },
          { title: 'Bulk Upload', description: 'Import employee data', icon: FileSpreadsheet, iconBg: 'bg-green-100', iconColor: 'text-green-600', href: '/employees/bulk-upload' },
          { title: 'View Reports', description: 'Analytics dashboard', icon: BarChart3, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', href: '/reports' },
          { title: 'Billing', description: 'View invoices', icon: CreditCard, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', href: '/billing' },
        ];
      case 'HR_MANAGER':
        return [
          { title: 'Add Employee', description: 'Register new employee', icon: UserPlus, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', href: '/employees/new' },
          { title: 'Bulk Upload', description: 'Import employee data', icon: FileSpreadsheet, iconBg: 'bg-green-100', iconColor: 'text-green-600', href: '/employees/bulk-upload' },
          { title: 'Attendance', description: 'Track attendance', icon: Clock, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', href: '/attendance' },
          { title: 'Reports', description: 'View analytics', icon: BarChart3, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', href: '/reports' },
        ];
      case 'RECEPTIONIST':
        return [
          { title: 'Verify Admission', description: 'Check employee access', icon: ShieldCheck, iconBg: 'bg-green-100', iconColor: 'text-green-600', href: '/admissions/verify' },
          { title: 'Check-In', description: 'Record attendance', icon: UserCheck, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', href: '/attendance/check-in' },
          { title: 'View Employees', description: 'Browse employee list', icon: Users, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', href: '/employees' },
          { title: 'Admission History', description: 'View past records', icon: Clock, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', href: '/admissions/history' },
        ];
      case 'SERVICE_PROVIDER_ADMIN':
        return [
          { title: 'View Admissions', description: "Check today's visits", icon: ShieldCheck, iconBg: 'bg-green-100', iconColor: 'text-green-600', href: '/admissions' },
          { title: 'Facility Stats', description: 'Usage analytics', icon: BarChart3, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', href: '/reports' },
          { title: 'Settings', description: 'Manage preferences', icon: Building2, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', href: '/settings' },
        ];
      default:
        return [];
    }
  };

  const recentActivities = [
    { user: 'John Doe', action: 'New employee registered', time: 'Just now', type: 'employee' as const },
    { user: 'Jane Smith', action: 'Admission verified', time: '15m ago', type: 'admission' as const },
    { user: 'Mike Johnson', action: 'Attendance recorded', time: '30m ago', type: 'attendance' as const },
    { user: 'System', action: 'Invoice generated', time: '1h ago', type: 'billing' as const },
    { user: 'Sarah Williams', action: 'Employee updated', time: '2h ago', type: 'employee' as const },
  ];

  const activityColors = {
    employee: { bg: 'bg-blue-100', text: 'text-blue-700' },
    admission: { bg: 'bg-green-100', text: 'text-green-700' },
    attendance: { bg: 'bg-purple-100', text: 'text-purple-700' },
    billing: { bg: 'bg-amber-100', text: 'text-amber-700' },
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-slate-600 mt-1">
          Here&apos;s what&apos;s happening with your system today.
        </p>
      </div>

      {/* Stats Cards */}
      {user?.role === 'HR_MANAGER' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+12%</span>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Employees</p>
              <p className="text-3xl font-bold text-slate-900">156</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Active Today</p>
              <p className="text-3xl font-bold text-slate-900">89</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">This Month</p>
              <p className="text-3xl font-bold text-slate-900">2,341</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Building2 className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Departments</p>
              <p className="text-3xl font-bold text-slate-900">8</p>
            </div>
          </div>
        </div>
      )}

      {user?.role === 'COMPANY_ADMIN' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+12%</span>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Employees</p>
              <p className="text-3xl font-bold text-slate-900">156</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+5%</span>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Active Today</p>
              <p className="text-3xl font-bold text-slate-900">89</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+8%</span>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">This Month</p>
              <p className="text-3xl font-bold text-slate-900">2,341</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-red-600">-3%</span>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Monthly Cost</p>
              <p className="text-3xl font-bold text-slate-900">$12,450</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getQuickActions().map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.href}>
                <div className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="p-6 flex items-center space-x-4">
                    <div className={`p-3 ${action.iconBg} rounded-lg`}>
                      <Icon className={`h-6 w-6 ${action.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{action.title}</h3>
                      <p className="text-sm text-slate-600">{action.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 py-3 border-b border-slate-100 last:border-0">
                  <div className={`w-10 h-10 ${activityColors[activity.type].bg} rounded-full flex items-center justify-center ${activityColors[activity.type].text} font-semibold`}>
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{activity.user}</p>
                    <p className="text-sm text-slate-600">{activity.action}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goals Sidebar */}
        <div className="space-y-6">
          {/* Today's Goal */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-slate-900">Today&apos;s Goal</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Check-ins</span>
                  <span className="font-medium">89/100</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Verifications</span>
                  <span className="font-medium">85/90</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-amber-600" />
              <h3 className="font-bold text-slate-900">This Week</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Check-ins</span>
                <span className="font-semibold text-slate-900">456</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Avg. Daily</span>
                <span className="font-semibold text-slate-900">65</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Peak Time</span>
                <span className="font-semibold text-slate-900">9:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}