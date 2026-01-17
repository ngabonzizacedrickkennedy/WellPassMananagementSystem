package com.varol.WellPass_Mananagement_System.mapper;

import com.varol.WellPass_Mananagement_System.dtos.response.employee.EmployeeResponse;
import com.varol.WellPass_Mananagement_System.model.user.Employee;

public class EmployeeMapper {

    public static EmployeeResponse toResponse(Employee employee) {
        if (employee == null) {
            return null;
        }

        EmployeeResponse response = new EmployeeResponse();
        response.setId(employee.getId());
        response.setEmployeeId(employee.getEmployeeId());
        response.setFullName(employee.getFullName());
        response.setPhoneNumber(employee.getPhoneNumber());
        response.setEmail(employee.getEmail());
        response.setDepartment(employee.getDepartment());
        response.setProfilePictureUrl(employee.getProfilePictureUrl());
        response.setStatus(employee.getStatus());
        response.setCompanyId(employee.getCompany().getId());
        response.setCompanyName(employee.getCompany().getCompanyName());
        response.setCreatedAt(employee.getCreatedAt());

        return response;
    }
}