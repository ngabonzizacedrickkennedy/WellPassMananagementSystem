export interface Company {
  id: number;
  name: string;
  registrationNumber: string;
  taxId: string;
  industry: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  email: string;
  website?: string;
  logo?: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  subscriptionStartDate: string;
  subscriptionEndDate?: string;
  maxEmployees: number;
  currentEmployees: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum SubscriptionPlan {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  TRIAL = 'TRIAL',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
}

export interface CreateCompanyRequest {
  name: string;
  registrationNumber: string;
  taxId: string;
  industry: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  email: string;
  website?: string;
  logo?: string;
  subscriptionPlan: SubscriptionPlan;
  maxEmployees: number;
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  subscriptionStatus?: SubscriptionStatus;
  isActive?: boolean;
}

export interface CompanyStats {
  totalEmployees: number;
  activeEmployees: number;
  subscriptionDaysRemaining: number;
  utilizationPercentage: number;
}