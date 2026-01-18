import api from '@/lib/api';
import { Company, CreateCompanyRequest, UpdateCompanyRequest } from '@/types/company';
import { ApiResponse, PageResponse } from '@/types/api';

export const companyService = {
  async getAllCompanies(page = 0, size = 10) {
    const response = await api.get<ApiResponse<PageResponse<Company>>>(
      `/api/companies?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  async getActiveCompanies() {
    const response = await api.get<ApiResponse<Company[]>>('/api/companies/active');
    return response.data.data;
  },

  async getCompanyById(id: number) {
    const response = await api.get<ApiResponse<Company>>(`/api/companies/${id}`);
    return response.data.data;
  },

  async getCompanyByCode(code: string) {
    const response = await api.get<ApiResponse<Company>>(`/api/companies/code/${code}`);
    return response.data.data;
  },

  async createCompany(data: CreateCompanyRequest) {
    const response = await api.post<ApiResponse<Company>>('/api/companies', data);
    return response.data.data;
  },

  async updateCompany(id: number, data: UpdateCompanyRequest) {
    const response = await api.put<ApiResponse<Company>>(`/api/companies/${id}`, data);
    return response.data.data;
  },

  async deleteCompany(id: number) {
    const response = await api.delete<ApiResponse<void>>(`/api/companies/${id}`);
    return response.data;
  },

  async activateCompany(id: number) {
    const response = await api.put<ApiResponse<void>>(`/api/companies/${id}/activate`);
    return response.data;
  },

  async deactivateCompany(id: number) {
    const response = await api.put<ApiResponse<void>>(`/api/companies/${id}/deactivate`);
    return response.data;
  },
};