export interface ServiceProvider {
  id: number;
  providerName: string;
  providerCode: string;
  serviceType: ServiceType;
  address?: string;
  phoneNumber?: string;
  email?: string;
  operatingHours?: string;
  capacity?: number;
  pricePerVisit?: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum ServiceType {
  GYM = 'GYM',
  YOGA = 'YOGA',
  SWIMMING = 'SWIMMING',
  PERSONAL_TRAINING = 'PERSONAL_TRAINING',
  FITNESS_CLASS = 'FITNESS_CLASS',
  WELLNESS = 'WELLNESS',
  OTHER = 'OTHER',
}

export interface CreateServiceProviderRequest {
  providerName: string;
  serviceType: ServiceType;
  address?: string;
  phoneNumber?: string;
  email?: string;
  operatingHours?: string;
  capacity?: number;
  pricePerVisit?: number;
  description?: string;
}

export interface UpdateServiceProviderRequest {
  providerName?: string;
  serviceType?: ServiceType;
  address?: string;
  phoneNumber?: string;
  email?: string;
  operatingHours?: string;
  capacity?: number;
  pricePerVisit?: number;
  description?: string;
}

export interface ServiceProviderStats {
  totalProviders: number;
  activeProviders: number;
  inactiveProviders: number;
  totalVisitsToday: number;
  totalRevenueToday: number;
}

export interface ServiceProviderFilters {
  search?: string;
  serviceType?: ServiceType;
  isActive?: boolean;
  page?: number;
  size?: number;
}