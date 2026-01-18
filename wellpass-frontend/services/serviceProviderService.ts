import api from '@/lib/api';
import { ServiceProvider, CreateServiceProviderRequest, UpdateServiceProviderRequest } from '@/types/serviceProvider';
import { ApiResponse, PageResponse } from '@/types/api';

export const serviceProviderService = {
  async getAllServiceProviders(page = 0, size = 10) {
    const response = await api.get<ApiResponse<PageResponse<ServiceProvider>>>(
      `/api/service-providers?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  async getActiveServiceProviders() {
    const response = await api.get<ApiResponse<ServiceProvider[]>>('/api/service-providers/active');
    return response.data.data;
  },

  async getServiceProviderById(id: number) {
    const response = await api.get<ApiResponse<ServiceProvider>>(`/api/service-providers/${id}`);
    return response.data.data;
  },

  async getServiceProviderByCode(code: string) {
    const response = await api.get<ApiResponse<ServiceProvider>>(`/api/service-providers/code/${code}`);
    return response.data.data;
  },

  async createServiceProvider(data: CreateServiceProviderRequest) {
    const response = await api.post<ApiResponse<ServiceProvider>>('/api/service-providers', data);
    return response.data.data;
  },

  async updateServiceProvider(id: number, data: UpdateServiceProviderRequest) {
    const response = await api.put<ApiResponse<ServiceProvider>>(`/api/service-providers/${id}`, data);
    return response.data.data;
  },

  async deleteServiceProvider(id: number) {
    const response = await api.delete<ApiResponse<void>>(`/api/service-providers/${id}`);
    return response.data;
  },

  async activateServiceProvider(id: number) {
    const response = await api.put<ApiResponse<void>>(`/api/service-providers/${id}/activate`);
    return response.data;
  },

  async deactivateServiceProvider(id: number) {
    const response = await api.put<ApiResponse<void>>(`/api/service-providers/${id}/deactivate`);
    return response.data;
  },
};