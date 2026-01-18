'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { companyService } from '@/services/companyService';
import { Company, UpdateCompanyRequest } from '@/types/company';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, ArrowLeft, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const companyId = Number(params.id);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<UpdateCompanyRequest>({
    companyName: '',
    address: '',
    phoneNumber: '',
    email: '',
    logoUrl: '',
  });

  useEffect(() => {
    fetchCompany();
  }, [companyId]);

  const fetchCompany = async () => {
    try {
      setFetching(true);
      const data = await companyService.getCompanyById(companyId);
      setFormData({
        companyName: data.companyName,
        address: data.address || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        logoUrl: data.logoUrl || '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load company');
      router.push('/companies');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName?.trim()) {
      toast.error('Company name is required');
      return;
    }

    try {
      setLoading(true);
      await companyService.updateCompany(companyId, formData);
      toast.success('Company updated successfully!');
      router.push(`/companies/${companyId}`);
    } catch (error: any) {
      console.error('Error updating company:', error);
      toast.error(error.response?.data?.message || 'Failed to update company');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={() => router.push(`/companies/${companyId}`)}
            variant="ghost"
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Details
          </Button>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Edit Company
              </h1>
              <p className="text-gray-600 mt-1">Update company information</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="companyName" className="text-gray-700 font-semibold">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="company@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-gray-700 font-semibold">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="+250 788 000 000"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-gray-700 font-semibold">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter company address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="logoUrl" className="text-gray-700 font-semibold">
                  Logo URL
                </Label>
                <Input
                  id="logoUrl"
                  name="logoUrl"
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Optional: Enter a URL to your company logo
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/companies/${companyId}`)}
                className="px-6 h-12 border-gray-300 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-8 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4">
          <h3 className="font-semibold text-amber-900 mb-2">⚠️ Note:</h3>
          <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
            <li>Company code cannot be changed after creation</li>
            <li>Changes will be reflected immediately</li>
            <li>All fields except company name are optional</li>
          </ul>
        </div>
      </div>
    </div>
  );
}