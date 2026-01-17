package com.varol.WellPass_Mananagement_System.mapper;

import com.varol.WellPass_Mananagement_System.dtos.response.attendance.AttendanceResponse;
import com.varol.WellPass_Mananagement_System.model.attendance.Attendance;

public class AttendanceMapper {

    public static AttendanceResponse toResponse(Attendance attendance) {
        if (attendance == null) {
            return null;
        }

        AttendanceResponse response = new AttendanceResponse();
        response.setId(attendance.getId());
        response.setEmployeeId(attendance.getEmployee().getEmployeeId());
        response.setEmployeeName(attendance.getEmployee().getFullName());
        response.setProfilePictureUrl(attendance.getEmployee().getProfilePictureUrl());
        response.setCompanyName(attendance.getCompany().getCompanyName());
        response.setDepartment(attendance.getEmployee().getDepartment());
        response.setServiceName(attendance.getService().getServiceName());
        response.setServiceProviderName(attendance.getServiceProvider().getProviderName());
        response.setPrice(attendance.getPrice());
        response.setCheckInTime(attendance.getCheckInTime());
        response.setCheckOutTime(attendance.getCheckOutTime());
        response.setStatus(attendance.getStatus());
        response.setVerifiedByOtp(attendance.getVerifiedByOtp());

        return response;
    }
}