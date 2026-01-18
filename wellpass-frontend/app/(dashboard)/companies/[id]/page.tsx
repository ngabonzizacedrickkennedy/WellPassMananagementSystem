'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { companyService } from '@/services/companyService';
import { Company } from '@/types/company';
import { Button } from '@/components/ui/button';
import {
  Building2,
  ArrowLeft,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CompanyDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const companyId = Number(params.id);
  
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, [companyId]);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const data = await companyService.getCompanyById(companyId);
      setCompany(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load company');
      router.push('/companies');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateDeactivate = async () => {
    if (!company) return;
    
    try {
      if (company.isActive) {
        await companyService.deactivateCompany(companyId);
        toast.success('Company deactivated successfully');
      } else {
        await companyService.activateCompany(companyId);
        toast.success('Company activated successfully');
      }
      fetchCompany();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async () => {
    if (!company) return;
    
    if (confirm(`Are you sure you want to delete ${company.companyName}?`)) {
      try {
        await companyService.deleteCompany(companyId);
        toast.success('Company deleted successfully');
        router.push('/companies');
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to delete company');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading company details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={() => router.push('/companies')}
            variant="ghost"
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Companies
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">
                  {company.companyName}
                </h1>
                <p className="text-gray-600 mt-1 font-mono">{company.companyCode}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={() => router.push(`/companies/${companyId}/edit`)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleActivateDeactivate}
                variant="outline"
                className={company.isActive ? 'border-orange-500 text-orange-600 hover:bg-orange-50' : 'border-green-500 text-green-600 hover:bg-green-50'}
              >
                {company.isActive ? (
                  <>
                    <PowerOff className="w-4 h-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Power className="w-4 h-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
              <Button
                onClick={handleDelete}
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Company Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="text-lg font-semibold text-gray-800">{company.companyName}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Company Code</p>
                    <p className="text-lg font-semibold text-gray-800 font-mono">{company.companyCode}</p>
                  </div>
                </div>

                {company.email && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-lg font-semibold text-gray-800">{company.email}</p>
                    </div>
                  </div>
                )}

                {company.phoneNumber && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-lg font-semibold text-gray-800">{company.phoneNumber}</p>
                    </div>
                  </div>
                )}

                {company.address && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-lg font-semibold text-gray-800">{company.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {company.employeeCount !== undefined && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-800">{company.employeeCount}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Status</h2>
              <div className={`flex items-center space-x-3 p-4 rounded-xl ${
                company.isActive ? 'bg-green-50' : 'bg-red-50'
              }`}>
                {company.isActive ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
                <div>
                  <p className="text-sm text-gray-600">Company Status</p>
                  <p className={`text-lg font-bold ${
                    company.isActive ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {company.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date(company.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date(company.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}