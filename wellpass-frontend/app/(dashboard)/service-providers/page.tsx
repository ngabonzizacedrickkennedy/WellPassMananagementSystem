'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serviceProviderService } from '@/services/serviceProviderService';
import { ServiceProvider, ServiceType } from '@/types/serviceProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Stethoscope,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  DollarSign,
} from 'lucide-react';
import toast from 'react-hot-toast';

const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  [ServiceType.GYM]: 'Gym',
  [ServiceType.SWIMMING_POOL]: 'Swimming Pool',
  [ServiceType.YOGA_STUDIO]: 'Yoga Studio',
  [ServiceType.SPA]: 'Spa',
  [ServiceType.SPORTS_COMPLEX]: 'Sports Complex',
  [ServiceType.FITNESS_CENTER]: 'Fitness Center',
};

const SERVICE_TYPE_COLORS: Record<ServiceType, { bg: string; text: string; icon: string }> = {
  [ServiceType.GYM]: { bg: 'bg-red-100', text: 'text-red-700', icon: 'bg-red-500' },
  [ServiceType.SWIMMING_POOL]: { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'bg-blue-500' },
  [ServiceType.YOGA_STUDIO]: { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'bg-purple-500' },
  [ServiceType.SPA]: { bg: 'bg-pink-100', text: 'text-pink-700', icon: 'bg-pink-500' },
  [ServiceType.SPORTS_COMPLEX]: { bg: 'bg-green-100', text: 'text-green-700', icon: 'bg-green-500' },
  [ServiceType.FITNESS_CENTER]: { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'bg-orange-500' },
};

export default function ServiceProvidersPage() {
  const router = useRouter();
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProviders();
  }, [currentPage]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await serviceProviderService.getAllServiceProviders(currentPage, 10);
      setProviders(response.content);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load service providers');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateDeactivate = async (id: number, isActive: boolean) => {
    try {
      if (isActive) {
        await serviceProviderService.deactivateServiceProvider(id);
        toast.success('Service provider deactivated successfully');
      } else {
        await serviceProviderService.activateServiceProvider(id);
        toast.success('Service provider activated successfully');
      }
      fetchProviders();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await serviceProviderService.deleteServiceProvider(id);
        toast.success('Service provider deleted successfully');
        fetchProviders();
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to delete service provider');
      }
    }
  };

  const filteredProviders = providers.filter((provider) =>
    provider.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.providerCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading service providers...</p>
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
                Service Provider Management
              </h1>
              <p className="text-gray-600 mt-2">Manage gyms, pools, and wellness facilities</p>
            </div>
            <Button
              onClick={() => router.push('/service-providers/new')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Service Provider
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search service providers by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        {filteredProviders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No service providers found</h3>
            <p className="text-gray-500">Start by adding your first service provider</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => {
              const colors = SERVICE_TYPE_COLORS[provider.serviceType];
              return (
                <div
                  key={provider.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <div className={`h-2 ${provider.isActive ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`} />
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center shadow-lg`}>
                          <Stethoscope className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{provider.providerName}</h3>
                          <p className="text-sm text-gray-500 font-mono">{provider.providerCode}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        provider.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {provider.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                        {SERVICE_TYPE_LABELS[provider.serviceType]}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      {provider.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="truncate">{provider.email}</span>
                        </div>
                      )}
                      {provider.phoneNumber && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-green-500" />
                          <span>{provider.phoneNumber}</span>
                        </div>
                      )}
                      {provider.address && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-red-500" />
                          <span className="truncate">{provider.address}</span>
                        </div>
                      )}
                      {provider.operatingHours && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-purple-500" />
                          <span>{provider.operatingHours}</span>
                        </div>
                      )}
                      {provider.capacity && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2 text-orange-500" />
                          <span>Capacity: {provider.capacity}</span>
                        </div>
                      )}
                      {provider.pricePerVisit && (
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                          <span>${provider.pricePerVisit} per visit</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                      <Button
                        onClick={() => router.push(`/service-providers/${provider.id}`)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        onClick={() => router.push(`/service-providers/${provider.id}/edit`)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleActivateDeactivate(provider.id, provider.isActive)}
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${
                          provider.isActive
                            ? 'border-orange-200 text-orange-600 hover:bg-orange-50'
                            : 'border-green-200 text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {provider.isActive ? (
                          <PowerOff className="w-4 h-4" />
                        ) : (
                          <Power className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDelete(provider.id, provider.providerName)}
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