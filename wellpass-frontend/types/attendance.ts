export interface Attendance {
  id: number;
  employeeId: number;
  checkInTime: string;
  checkOutTime?: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  location?: string;
  verifiedBy?: number;
  createdAt: string;
  updatedAt: string;
  employee?: {
    id: number;
    firstName: string;
    lastName: string;
    employeeNumber: string;
  };
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  HALF_DAY = 'HALF_DAY',
  ON_LEAVE = 'ON_LEAVE',
}

export interface CheckInRequest {
  employeeId: number;
  location?: string;
  notes?: string;
}

export interface CheckOutRequest {
  attendanceId: number;
  notes?: string;
}

export interface AttendanceFilter {
  employeeId?: number;
  companyId?: number;
  startDate?: string;
  endDate?: string;
  status?: AttendanceStatus;
}

export interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  attendanceRate: number;
}