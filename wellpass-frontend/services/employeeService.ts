import api from '@/lib/api';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest, EmployeeFilters, EmployeeStats } from '@/types/employee';
import { ApiResponse, PageResponse } from '@/types/api';

export const employeeService = {
  async registerEmployee(data: CreateEmployeeRequest) {
    const response = await api.post<ApiResponse<Employee>>('/api/employees/register', data);
    return response.data.data;
  },

  async searchEmployees(filters: EmployeeFilters) {
    const response = await api.post<ApiResponse<PageResponse<Employee>>>('/api/employees/search', filters);
    return response.data.data;
  },

  async getEmployeeById(id: number) {
    const response = await api.get<ApiResponse<Employee>>(`/api/employees/${id}`);
    return response.data.data;
  },

  async getEmployeeByCode(code: string) {
    const response = await api.get<ApiResponse<Employee>>(`/api/employees/code/${code}`);
    return response.data.data;
  },

  async getEmployeesByCompany(companyId: number, page = 0, size = 20) {
    const response = await api.get<ApiResponse<PageResponse<Employee>>>(
      `/api/employees/company/${companyId}?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  async updateEmployee(id: number, data: UpdateEmployeeRequest) {
    const response = await api.put<ApiResponse<Employee>>(`/api/employees/${id}`, data);
    return response.data.data;
  },

  async deleteEmployee(id: number) {
    const response = await api.delete<ApiResponse<void>>(`/api/employees/${id}`);
    return response.data;
  },

  async activateEmployee(id: number) {
    const response = await api.put<ApiResponse<Employee>>(`/api/employees/${id}/activate`);
    return response.data.data;
  },

  async deactivateEmployee(id: number) {
    const response = await api.put<ApiResponse<Employee>>(`/api/employees/${id}/deactivate`);
    return response.data.data;
  },

  async bulkUploadEmployees(companyId: number, employees: CreateEmployeeRequest[]) {
    const response = await api.post<ApiResponse<{ success: number; failed: number }>>(
      '/api/employees/bulk-upload',
      { companyId, employees }
    );
    return response.data.data;
  },

  async getEmployeeStats(companyId?: number) {
    if (!companyId) {
      throw new Error('Company ID is required to fetch employee stats');
    }
    const response = await api.get<ApiResponse<EmployeeStats>>(`/api/employees/company/${companyId}/stats`);
    return response.data.data;
  },

  async downloadQRCode(employeeId: number) {
    const response = await api.get(`/api/employees/${employeeId}/qr-code`, {
      responseType: 'blob',
    });
    return response.data;
  },
};