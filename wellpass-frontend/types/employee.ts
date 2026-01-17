export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  employeeNumber: string;
  department: string;
  position: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  hireDate: string;
  contractType: ContractType;
  employmentStatus: EmploymentStatus;
  companyId: number;
  isActive: boolean;
  profilePicture?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum ContractType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERN = 'INTERN',
}

export enum EmploymentStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  employeeNumber: string;
  department: string;
  position: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  hireDate: string;
  contractType: ContractType;
  companyId: number;
  profilePicture?: string;
  notes?: string;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  employmentStatus?: EmploymentStatus;
  isActive?: boolean;
}

export interface EmployeeFilter {
  search?: string;
  department?: string;
  position?: string;
  contractType?: ContractType;
  employmentStatus?: EmploymentStatus;
  companyId?: number;
  isActive?: boolean;
}