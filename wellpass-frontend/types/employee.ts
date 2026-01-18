export interface Employee {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  companyId: number;
  companyName?: string;
  department: string;
  position?: string;
  hireDate: string;
  membershipPlan?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePictureUrl?: string;
  qrCodeUrl?: string;
  status: EmployeeStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export interface CreateEmployeeRequest {
  fullName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  companyId: number;
  department: string;
  position?: string;
  hireDate: string;
  membershipPlan?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePictureUrl?: string;
}

export interface UpdateEmployeeRequest {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  department?: string;
  position?: string;
  hireDate?: string;
  membershipPlan?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePictureUrl?: string;
  status?: EmployeeStatus;
}

export interface BulkUploadEmployeeRequest {
  companyId: number;
  employees: CreateEmployeeRequest[];
}

export interface EmployeeStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  suspendedEmployees: number;
  totalVisitsThisMonth: number;
  averageVisitsPerEmployee: number;
}

export interface EmployeeFilters {
  companyId?: number;
  department?: string;
  status?: EmployeeStatus;
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}