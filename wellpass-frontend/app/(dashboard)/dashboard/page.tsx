'use client';

import { useAuth } from '@/context/AuthContext';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import {
  Users,
  Clock,
  ShieldCheck,
  CreditCard,
  TrendingUp,
  Building2,
  UserPlus,
  FileSpreadsheet,
  UserCheck,
  BarChart3,
} from 'lucide-react';

const superAdminActions = [
  {
    label: 'Add Company',
    icon: Building2,
    href: '/companies/new',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Add Provider',
    icon: UserPlus,
    href: '/service-providers/new',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    label: 'View Reports',
    icon: BarChart3,
    href: '/reports',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    label: 'Billing Overview',
    icon: CreditCard,
    href: '/billing',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
];

const companyAdminActions = [
  {
    label: 'Add Employee',
    icon: UserPlus,
    href: '/employees/new',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Bulk Upload',
    icon: FileSpreadsheet,
    href: '/employees/bulk-upload',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    label: 'View Reports',
    icon: BarChart3,
    href: '/reports',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    label: 'Billing',
    icon: CreditCard,
    href: '/billing',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
];

const hrManagerActions = [
  {
    label: 'Add Employee',
    icon: UserPlus,
    href: '/employees/new',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Bulk Upload',
    icon: FileSpreadsheet,
    href: '/employees/bulk-upload',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    label: 'Attendance',
    icon: Clock,
    href: '/attendance',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    label: 'Reports',
    icon: BarChart3,
    href: '/reports',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

const receptionistActions = [
  {
    label: 'Verify Admission',
    icon: ShieldCheck,
    href: '/admissions/verify',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    label: 'Check-In',
    icon: UserCheck,
    href: '/attendance/check-in',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'View Employees',
    icon: Users,
    href: '/employees',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    label: 'Admission History',
    icon: Clock,
    href: '/admissions/history',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
];

const serviceProviderActions = [
  {
    label: 'View Admissions',
    icon: ShieldCheck,
    href: '/admissions',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    label: 'Facility Stats',
    icon: BarChart3,
    href: '/reports',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Settings',
    icon: Building2,
    href: '/settings',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

const sampleActivities = [
  {
    id: 1,
    type: 'employee' as const,
    user: 'John Doe',
    action: 'New employee registered',
    timestamp: new Date().toISOString(),
    details: 'Added to Marketing Department',
  },
  {
    id: 2,
    type: 'admission' as const,
    user: 'Jane Smith',
    action: 'Admission verified',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    details: 'Checked in at FitLife Gym',
  },
  {
    id: 3,
    type: 'attendance' as const,
    user: 'Mike Johnson',
    action: 'Attendance recorded',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    details: 'Swimming Pool - Premium',
  },
  {
    id: 4,
    type: 'billing' as const,
    user: 'System',
    action: 'Invoice generated',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: 'December monthly invoice',
  },
  {
    id: 5,
    type: 'employee' as const,
    user: 'Sarah Williams',
    action: 'Employee updated',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    details: 'Position changed to Senior Manager',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const getQuickActions = () => {
    switch (user?.role) {
      case 'SUPER_ADMIN':
        return superAdminActions;
      case 'COMPANY_ADMIN':
        return companyAdminActions;
      case 'HR_MANAGER':
        return hrManagerActions;
      case 'RECEPTIONIST':
        return receptionistActions;
      case 'SERVICE_PROVIDER_ADMIN':
        return serviceProviderActions;
      default:
        return [];
    }
  };

  const renderSuperAdminDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Companies"
          value="24"
          icon={Building2}
          trend={{ value: 12, isPositive: true }}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          description="Active companies"
        />
        <StatsCard
          title="Total Employees"
          value="1,248"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          description="Across all companies"
        />
        <StatsCard
          title="Service Providers"
          value="12"
          icon={Building2}
          trend={{ value: 5, isPositive: true }}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          description="Active providers"
        />
        <StatsCard
          title="Monthly Revenue"
          value="$48,250"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
          description="This month"
        />
      </div>
    </>
  );

  const renderCompanyAdminDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Employees"
          value="156"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          description="In your company"
        />
        <StatsCard
          title="Active Today"
          value="89"
          icon={UserCheck}
          trend={{ value: 5, isPositive: true }}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          description="Checked in"
        />
        <StatsCard
          title="This Month"
          value="2,341"
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          description="Total check-ins"
        />
        <StatsCard
          title="Monthly Cost"
          value="$12,450"
          icon={CreditCard}
          trend={{ value: 3, isPositive: false }}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
          description="This month"
        />
      </div>
    </>
  );

  const renderHRManagerDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Employees"
          value="156"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          description="In your company"
        />
        <StatsCard
          title="Active Today"
          value="89"
          icon={UserCheck}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          description="Checked in"
        />
        <StatsCard
          title="This Month"
          value="2,341"
          icon={Clock}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          description="Total attendance"
        />
        <StatsCard
          title="Departments"
          value="8"
          icon={Building2}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100"
          description="Active departments"
        />
      </div>
    </>
  );

  const renderReceptionistDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Today's Check-ins"
          value="89"
          icon={UserCheck}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          description="So far today"
        />
        <StatsCard
          title="Verified"
          value="85"
          icon={ShieldCheck}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          description="Admissions verified"
        />
        <StatsCard
          title="Pending"
          value="4"
          icon={Clock}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
          description="Awaiting verification"
        />
        <StatsCard
          title="Active Employees"
          value="156"
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          description="Total employees"
        />
      </div>
    </>
  );

  const renderServiceProviderDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Today's Admissions"
          value="124"
          icon={ShieldCheck}
          trend={{ value: 15, isPositive: true }}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          description="Verified admissions"
        />
        <StatsCard
          title="Facility Usage"
          value="78%"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          description="Current capacity"
        />
        <StatsCard
          title="This Month"
          value="3,542"
          icon={Clock}
          trend={{ value: 12, isPositive: true }}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          description="Total admissions"
        />
        <StatsCard
          title="Revenue"
          value="$28,650"
          icon={CreditCard}
          trend={{ value: 8, isPositive: true }}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
          description="This month"
        />
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-slate-600 mt-2">
          Here's what's happening with your system today.
        </p>
      </div>

      {user?.role === 'SUPER_ADMIN' && renderSuperAdminDashboard()}
      {user?.role === 'COMPANY_ADMIN' && renderCompanyAdminDashboard()}
      {user?.role === 'HR_MANAGER' && renderHRManagerDashboard()}
      {user?.role === 'RECEPTIONIST' && renderReceptionistDashboard()}
      {user?.role === 'SERVICE_PROVIDER_ADMIN' && renderServiceProviderDashboard()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity activities={sampleActivities} />
        </div>
        <div>
          <QuickActions actions={getQuickActions()} />
        </div>
      </div>
    </div>
  );
}