'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { employeeService } from '@/services/employeeService';
import { Employee, EmployeeStatus, EmployeeFilters } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Mail,
  Phone,
  Briefcase,
  Building2,
  FileSpreadsheet,
  Filter,
  QrCode,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const STATUS_COLORS: Record<EmployeeStatus, { bg: string; text: string }> = {
  [EmployeeStatus.ACTIVE]: { bg: 'bg-green-100', text: 'text-green-700' },
  [EmployeeStatus.INACTIVE]: { bg: 'bg-gray-100', text: 'text-gray-700' },
  [EmployeeStatus.SUSPENDED]: { bg: 'bg-red-100', text: 'text-red-700' },
};

export default function Page() {
  const router = useRouter();
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | ''>('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

  useEffect(() => {
    fetchEmployees();
    fetchStats();
  }, [currentPage, statusFilter]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const filters: EmployeeFilters = {
        page: currentPage,
        size: 12,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
        department: departmentFilter || undefined,
        companyId: user?.role === 'COMPANY_ADMIN' ? user.companyId : undefined,
      };
      
      const response = await employeeService.searchEmployees(filters);
      setEmployees(response.content);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const companyId = user?.role === 'COMPANY_ADMIN' ? user.companyId : undefined;
      
      if (!companyId) {
        setStats({ total: 0, active: 0, inactive: 0 });
        return;
      }
      
      const data = await employeeService.getEmployeeStats(companyId);
      setStats({
        total: data.totalEmployees,
        active: data.activeEmployees,
        inactive: data.inactiveEmployees,
      });
    } catch (error) {
      console.error('Failed to fetch stats');
      setStats({ total: 0, active: 0, inactive: 0 });
    }
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchEmployees();
  };

  const handleActivateDeactivate = async (id: number, isActive: boolean) => {
    try {
      if (isActive) {
        await employeeService.deactivateEmployee(id);
        toast.success('Employee deactivated successfully');
      } else {
        await employeeService.activateEmployee(id);
        toast.success('Employee activated successfully');
      }
      fetchEmployees();
      fetchStats();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await employeeService.deleteEmployee(id);
        toast.success('Employee deleted successfully');
        fetchEmployees();
        fetchStats();
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to delete employee');
      }
    }
  };

  const handleDownloadQR = async (id: number, name: string) => {
    try {
      const blob = await employeeService.downloadQRCode(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name.replace(/\s+/g, '_')}_QR.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('QR code downloaded successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to download QR code');
    }
  };

  if (loading && currentPage === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading employees...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Employee Management
              </h1>
              <p className="text-gray-600 mt-2">Manage your company's employees</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => router.push('/employees/bulk-upload')}
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <FileSpreadsheet className="w-5 h-5 mr-2" />
                Bulk Upload
              </Button>
              <Button
                onClick={() => router.push('/employees/new')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Employee
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Employees</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active</p>
                  <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Power className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Inactive</p>
                  <p className="text-3xl font-bold text-gray-600">{stats.inactive}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <PowerOff className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or employee code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 h-12 bg-gray-50 border-gray-200"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as EmployeeStatus | '')}
                className="h-12 px-4 rounded-md border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value={EmployeeStatus.ACTIVE}>Active</option>
                <option value={EmployeeStatus.INACTIVE}>Inactive</option>
                <option value={EmployeeStatus.SUSPENDED}>Suspended</option>
              </select>

              <Input
                type="text"
                placeholder="Department..."
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="h-12 w-48 bg-gray-50 border-gray-200"
              />

              <Button
                onClick={handleSearch}
                className="h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        {employees.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No employees found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first employee</p>
            <Button
              onClick={() => router.push('/employees/new')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Employee
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => {
              const statusColor = STATUS_COLORS[employee.status];
              return (
                <div
                  key={employee.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <div className={`h-2 ${employee.isActive ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`} />
                  
                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                        {employee.profilePictureUrl ? (
                          <Image
                            src={employee.profilePictureUrl}
                            alt={employee.fullName}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Users className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-800 truncate">{employee.fullName}</h3>
                        <p className="text-sm text-gray-500 font-mono">{employee.employeeCode}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mt-2 ${statusColor.bg} ${statusColor.text}`}>
                          {employee.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {employee.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                          <span className="truncate">{employee.email}</span>
                        </div>
                      )}
                      {employee.phoneNumber && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                          <span>{employee.phoneNumber}</span>
                        </div>
                      )}
                      {employee.department && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                          <span className="truncate">{employee.department}</span>
                        </div>
                      )}
                      {employee.companyName && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Building2 className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
                          <span className="truncate">{employee.companyName}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-5 gap-1 pt-4 border-t border-gray-100">
                      <Button
                        onClick={() => router.push(`/employees/${employee.id}`)}
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => router.push(`/employees/${employee.id}/edit`)}
                        variant="outline"
                        size="sm"
                        className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDownloadQR(employee.id, employee.fullName)}
                        variant="outline"
                        size="sm"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleActivateDeactivate(employee.id, employee.isActive)}
                        variant="outline"
                        size="sm"
                        className={employee.isActive ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}
                      >
                        {employee.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={() => handleDelete(employee.id, employee.fullName)}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              variant="outline"
              className="border-gray-300"
            >
              Previous
            </Button>
            <span className="px-4 py-2 bg-white rounded-lg shadow border border-gray-200">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              variant="outline"
              className="border-gray-300"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}