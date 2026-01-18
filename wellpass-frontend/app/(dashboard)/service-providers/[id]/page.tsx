'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { serviceProviderService } from '@/services/serviceProviderService';
import { ServiceProvider, ServiceType } from '@/types/serviceProvider';
import { Button } from '@/components/ui/button';
import {
  Stethoscope,
  ArrowLeft,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  FileText,
} from 'lucide-react';
import toast from 'react-hot-toast';

const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  [ServiceType.GYM]: 'Gym',
  [ServiceType.YOGA]: 'Yoga',
  [ServiceType.SWIMMING]: 'Swimming',
  [ServiceType.PERSONAL_TRAINING]: 'Personal Training',
  [ServiceType.FITNESS_CLASS]: 'Fitness Class',
  [ServiceType.WELLNESS]: 'Wellness',
  [ServiceType.OTHER]: 'Other',
};

const SERVICE_TYPE_COLORS: Record<ServiceType, { bg: string; text: string; icon: string }> = {
  [ServiceType.GYM]: { bg: 'bg-red-100', text: 'text-red-700', icon: 'bg-red-500' },
  [ServiceType.YOGA]: { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'bg-purple-500' },
  [ServiceType.SWIMMING]: { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'bg-blue-500' },
  [ServiceType.PERSONAL_TRAINING]: { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'bg-orange-500' },
  [ServiceType.FITNESS_CLASS]: { bg: 'bg-green-100', text: 'text-green-700', icon: 'bg-green-500' },
  [ServiceType.WELLNESS]: { bg: 'bg-pink-100', text: 'text-pink-700', icon: 'bg-pink-500' },
  [ServiceType.OTHER]: { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'bg-gray-500' },
};
export default function Page() {
  const router = useRouter();
  const params = useParams();
  const providerId = Number(params.id);
  
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProvider();
  }, [providerId]);

  const fetchProvider = async () => {
    try {
      setLoading(true);
      const data = await serviceProviderService.getServiceProviderById(providerId);
      setProvider(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load service provider');
      router.push('/service-providers');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateDeactivate = async () => {
    if (!provider) return;
    
    try {
      if (provider.isActive) {
        await serviceProviderService.deactivateServiceProvider(providerId);
        toast.success('Service provider deactivated successfully');
      } else {
        await serviceProviderService.activateServiceProvider(providerId);
        toast.success('Service provider activated successfully');
      }
      fetchProvider();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async () => {
    if (!provider) return;
    
    if (confirm(`Are you sure you want to delete ${provider.providerName}?`)) {
      try {
        await serviceProviderService.deleteServiceProvider(providerId);
        toast.success('Service provider deleted successfully');
        router.push('/service-providers');
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to delete service provider');
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
              <p className="mt-4 text-gray-600">Loading service provider details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) return null;

  const colors = provider.serviceType ? SERVICE_TYPE_COLORS[provider.serviceType] : { bg: 'bg-gray-100', text: 'text-gray-700' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={() => router.push('/service-providers')}
            variant="ghost"
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Service Providers
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">
                  {provider.providerName}
                </h1>
                <p className="text-gray-600 mt-1 font-mono">{provider.providerCode}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={() => router.push(`/service-providers/${providerId}/edit`)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleActivateDeactivate}
                variant="outline"
                className={provider.isActive ? 'border-orange-500 text-orange-600 hover:bg-orange-50' : 'border-green-500 text-green-600 hover:bg-green-50'}
              >
                {provider.isActive ? (
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
              <h2 className="text-xl font-bold text-gray-800 mb-6">Provider Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Provider Name</p>
                    <p className="text-lg font-semibold text-gray-800">{provider.providerName}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Provider Code</p>
                    <p className="text-lg font-semibold text-gray-800 font-mono">{provider.providerCode}</p>
                  </div>
                </div>

                {provider.serviceType && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Stethoscope className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Service Type</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${colors.bg} ${colors.text}`}>
                        {SERVICE_TYPE_LABELS[provider.serviceType]}
                      </span>
                    </div>
                  </div>
                )}

                {provider.email && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-lg font-semibold text-gray-800">{provider.email}</p>
                    </div>
                  </div>
                )}

                {provider.phoneNumber && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-lg font-semibold text-gray-800">{provider.phoneNumber}</p>
                    </div>
                  </div>
                )}

                {provider.address && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-lg font-semibold text-gray-800">{provider.address}</p>
                    </div>
                  </div>
                )}

                {provider.operatingHours && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Operating Hours</p>
                      <p className="text-lg font-semibold text-gray-800">{provider.operatingHours}</p>
                    </div>
                  </div>
                )}

                {provider.description && (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-base text-gray-800">{provider.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {(provider.capacity || provider.pricePerVisit) && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Facility Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  {provider.capacity && (
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                      <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Capacity</p>
                        <p className="text-2xl font-bold text-gray-800">{provider.capacity}</p>
                      </div>
                    </div>
                  )}
                  {provider.pricePerVisit && (
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price Per Visit</p>
                        <p className="text-2xl font-bold text-gray-800">${provider.pricePerVisit}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Status</h2>
              <div className={`flex items-center space-x-3 p-4 rounded-xl ${
                provider.isActive ? 'bg-green-50' : 'bg-red-50'
              }`}>
                {provider.isActive ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
                <div>
                  <p className="text-sm text-gray-600">Provider Status</p>
                  <p className={`text-lg font-bold ${
                    provider.isActive ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {provider.isActive ? 'Active' : 'Inactive'}
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
                      {new Date(provider.createdAt).toLocaleDateString('en-US', {
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
                      {new Date(provider.updatedAt).toLocaleDateString('en-US', {
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