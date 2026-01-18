export interface User {
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
  companyId?: number;
  companyName?: string;
  serviceProviderId?: number;
  serviceProviderName?: string;
  isActive: boolean;
  createdAt: string;
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  RECEPTIONIST = 'RECEPTIONIST',
  SERVICE_PROVIDER_ADMIN = 'SERVICE_PROVIDER_ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  companyId?: number;
  serviceProviderId?: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  newPassword: string;
}