'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { serviceProviderService } from '@/services/serviceProviderService';
import { ServiceProvider, UpdateServiceProviderRequest, ServiceType } from '@/types/serviceProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Stethoscope, ArrowLeft, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SERVICE_TYPES = [
  { value: ServiceType.GYM, label: 'Gym' },
  { value: ServiceType.PERSONAL_TRAINING, label: 'Swimming Pool' },
  { value: ServiceType.SWIMMING, label: 'Yoga Studio' },
  { value: ServiceType.WELLNESS, label: 'Spa' },
  { value: ServiceType.YOGA, label: 'Sports Complex' },
  { value: ServiceType.YOGA, label: 'Fitness Center' },
];

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const providerId = Number(params.id);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<UpdateServiceProviderRequest>({
    providerName: '',
    serviceType: ServiceType.GYM,
    address: '',
    phoneNumber: '',
    email: '',
    operatingHours: '',
    capacity: undefined,
    pricePerVisit: undefined,
    description: '',
  });

  useEffect(() => {
    fetchProvider();
  }, [providerId]);

  const fetchProvider = async () => {
    try {
      setFetching(true);
      const data = await serviceProviderService.getServiceProviderById(providerId);
      setFormData({
        providerName: data.providerName,
        serviceType: data.serviceType || ServiceType.GYM,
        address: data.address || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        operatingHours: data.operatingHours || '',
        capacity: data.capacity,
        pricePerVisit: data.pricePerVisit,
        description: data.description || '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load service provider');
      router.push('/service-providers');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacity' || name === 'pricePerVisit' ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.providerName?.trim()) {
      toast.error('Provider name is required');
      return;
    }

    try {
      setLoading(true);
      await serviceProviderService.updateServiceProvider(providerId, formData);
      toast.success('Service provider updated successfully!');
      router.push(`/service-providers/${providerId}`);
    } catch (error: any) {
      console.error('Error updating service provider:', error);
      toast.error(error.response?.data?.message || 'Failed to update service provider');
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
              <p className="mt-4 text-gray-600">Loading service provider details...</p>
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
            onClick={() => router.push(`/service-providers/${providerId}`)}
            variant="ghost"
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Details
          </Button>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Edit Service Provider
              </h1>
              <p className="text-gray-600 mt-1">Update service provider information</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="providerName" className="text-gray-700 font-semibold">
                  Provider Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="providerName"
                  name="providerName"
                  type="text"
                  placeholder="Enter provider name"
                  value={formData.providerName}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="serviceType" className="text-gray-700 font-semibold">
                  Service Type
                </Label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="mt-2 h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                >
                  {SERVICE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="provider@example.com"
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
                  placeholder="Enter facility address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <Label htmlFor="operatingHours" className="text-gray-700 font-semibold">
                  Operating Hours
                </Label>
                <Input
                  id="operatingHours"
                  name="operatingHours"
                  type="text"
                  placeholder="e.g., Mon-Fri: 6AM-10PM, Sat-Sun: 7AM-8PM"
                  value={formData.operatingHours}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <Label htmlFor="capacity" className="text-gray-700 font-semibold">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="0"
                  placeholder="Maximum capacity"
                  value={formData.capacity || ''}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <Label htmlFor="pricePerVisit" className="text-gray-700 font-semibold">
                  Price Per Visit ($)
                </Label>
                <Input
                  id="pricePerVisit"
                  name="pricePerVisit"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.pricePerVisit || ''}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-gray-700 font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of the facility and services offered..."
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-2 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-h-[100px]"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/service-providers/${providerId}`)}
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
            <li>Provider code cannot be changed after creation</li>
            <li>Changes will be reflected immediately</li>
            <li>All fields except provider name are optional</li>
            <li>Price per visit will be used for billing calculations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}