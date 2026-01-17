export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  RECEPTIONIST = 'RECEPTIONIST',
  SERVICE_PROVIDER_ADMIN = 'SERVICE_PROVIDER_ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface Permission {
  module: string;
  action: string;
  roles: UserRole[];
}

export const permissions: Permission[] = [
  {
    module: 'employees',
    action: 'view',
    roles: [
      UserRole.SUPER_ADMIN,
      UserRole.COMPANY_ADMIN,
      UserRole.HR_MANAGER,
      UserRole.RECEPTIONIST,
    ],
  },
  {
    module: 'employees',
    action: 'create',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.HR_MANAGER],
  },
  {
    module: 'employees',
    action: 'update',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.HR_MANAGER],
  },
  {
    module: 'employees',
    action: 'delete',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN],
  },
  {
    module: 'employees',
    action: 'activate',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN],
  },
  {
    module: 'employees',
    action: 'deactivate',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN],
  },
  {
    module: 'employees',
    action: 'bulk-upload',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.HR_MANAGER],
  },
  {
    module: 'employees',
    action: 'view-stats',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.HR_MANAGER],
  },
  {
    module: 'attendance',
    action: 'view',
    roles: [
      UserRole.SUPER_ADMIN,
      UserRole.COMPANY_ADMIN,
      UserRole.HR_MANAGER,
      UserRole.RECEPTIONIST,
    ],
  },
  {
    module: 'attendance',
    action: 'create',
    roles: [UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST],
  },
  {
    module: 'admission',
    action: 'verify',
    roles: [UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST, UserRole.COMPANY_ADMIN],
  },
  {
    module: 'companies',
    action: 'view',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN],
  },
  {
    module: 'companies',
    action: 'create',
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    module: 'companies',
    action: 'update',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN],
  },
  {
    module: 'companies',
    action: 'delete',
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    module: 'service-providers',
    action: 'view',
    roles: [UserRole.SUPER_ADMIN, UserRole.SERVICE_PROVIDER_ADMIN],
  },
  {
    module: 'service-providers',
    action: 'create',
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    module: 'service-providers',
    action: 'update',
    roles: [UserRole.SUPER_ADMIN, UserRole.SERVICE_PROVIDER_ADMIN],
  },
  {
    module: 'service-providers',
    action: 'delete',
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    module: 'billing',
    action: 'view',
    roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN],
  },
  {
    module: 'billing',
    action: 'create',
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    module: 'billing',
    action: 'update',
    roles: [UserRole.SUPER_ADMIN],
  },
];

export const checkPermission = (
  userRole: UserRole | undefined,
  module: string,
  action: string
): boolean => {
  if (!userRole) return false;

  const permission = permissions.find(
    (p) => p.module === module && p.action === action
  );

  if (!permission) return false;

  return permission.roles.includes(userRole);
};

export const hasAnyRole = (
  userRole: UserRole | undefined,
  allowedRoles: UserRole[]
): boolean => {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};

export const canManageEmployees = (userRole: UserRole | undefined): boolean => {
  return hasAnyRole(userRole, [
    UserRole.SUPER_ADMIN,
    UserRole.COMPANY_ADMIN,
    UserRole.HR_MANAGER,
  ]);
};

export const canDeleteEmployees = (userRole: UserRole | undefined): boolean => {
  return hasAnyRole(userRole, [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN]);
};

export const canActivateDeactivateEmployees = (
  userRole: UserRole | undefined
): boolean => {
  return hasAnyRole(userRole, [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN]);
};

export const canViewEmployeeStats = (userRole: UserRole | undefined): boolean => {
  return hasAnyRole(userRole, [
    UserRole.SUPER_ADMIN,
    UserRole.COMPANY_ADMIN,
    UserRole.HR_MANAGER,
  ]);
};