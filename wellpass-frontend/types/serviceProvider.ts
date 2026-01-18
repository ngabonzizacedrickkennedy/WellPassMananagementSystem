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
  SWIMMING_POOL = 'SWIMMING_POOL',
  YOGA_STUDIO = 'YOGA_STUDIO',
  SPA = 'SPA',
  SPORTS_COMPLEX = 'SPORTS_COMPLEX',
  FITNESS_CENTER = 'FITNESS_CENTER',
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