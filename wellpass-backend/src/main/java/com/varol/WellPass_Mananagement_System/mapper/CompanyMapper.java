package com.varol.WellPass_Mananagement_System.mapper;

import com.varol.WellPass_Mananagement_System.model.organization.Company;

public class CompanyMapper {

    public static Company toEntity(String companyName, String companyCode) {
        if (companyName == null || companyCode == null) {
            return null;
        }

        Company company = new Company();
        company.setCompanyName(companyName);
        company.setCompanyCode(companyCode);
        company.setIsActive(true);

        return company;
    }
}