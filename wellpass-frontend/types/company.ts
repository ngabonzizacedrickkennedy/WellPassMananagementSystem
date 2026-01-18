export interface Company {
  id: number;
  companyName: string;
  companyCode: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  logoUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  employeeCount?: number;
}

export interface CreateCompanyRequest {
  companyName: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  logoUrl?: string;
}

export interface UpdateCompanyRequest {
  companyName?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  logoUrl?: string;
}

export interface CompanyStats {
  totalCompanies: number;
  activeCompanies: number;
  inactiveCompanies: number;
  totalEmployees: number;
}

export interface CompanyFilters {
  search?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}