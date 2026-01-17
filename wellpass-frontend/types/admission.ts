export interface Admission {
  id: number;
  employeeId: number;
  serviceProviderId: number;
  admissionDate: string;
  admissionTime: string;
  purpose: string;
  status: AdmissionStatus;
  verificationCode?: string;
  verifiedBy?: number;
  verifiedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  employee?: {
    id: number;
    firstName: string;
    lastName: string;
    employeeNumber: string;
  };
  serviceProvider?: {
    id: number;
    name: string;
    serviceType: string;
  };
}

export enum AdmissionStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface CreateAdmissionRequest {
  employeeId: number;
  serviceProviderId: number;
  purpose: string;
  notes?: string;
}

export interface VerifyAdmissionRequest {
  admissionId: number;
  verificationCode: string;
}

export interface AdmissionFilter {
  employeeId?: number;
  serviceProviderId?: number;
  companyId?: number;
  startDate?: string;
  endDate?: string;
  status?: AdmissionStatus;
}