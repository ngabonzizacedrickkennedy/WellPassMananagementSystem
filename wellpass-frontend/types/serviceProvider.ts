export interface ServiceProvider {
  id: number;
  name: string;
  serviceType: ServiceType;
  registrationNumber: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  email: string;
  contactPerson: string;
  contactPhone: string;
  operatingHours: string;
  facilities: string[];
  specializations: string[];
  rating?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum ServiceType {
  HOSPITAL = 'HOSPITAL',
  CLINIC = 'CLINIC',
  PHARMACY = 'PHARMACY',
  LABORATORY = 'LABORATORY',
  DENTAL = 'DENTAL',
  OPTICAL = 'OPTICAL',
  PHYSIOTHERAPY = 'PHYSIOTHERAPY',
  MENTAL_HEALTH = 'MENTAL_HEALTH',
  OTHER = 'OTHER',
}

export interface CreateServiceProviderRequest {
  name: string;
  serviceType: ServiceType;
  registrationNumber: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  email: string;
  contactPerson: string;
  contactPhone: string;
  operatingHours: string;
  facilities: string[];
  specializations: string[];
}

export interface UpdateServiceProviderRequest extends Partial<CreateServiceProviderRequest> {
  rating?: number;
  isActive?: boolean;
}

export interface ServiceProviderFilter {
  serviceType?: ServiceType;
  city?: string;
  isActive?: boolean;
  search?: string;
}