package com.varol.WellPass_Mananagement_System.mapper;

import com.varol.WellPass_Mananagement_System.dtos.response.billing.InvoiceResponse;
import com.varol.WellPass_Mananagement_System.model.billing.Invoice;

public class InvoiceMapper {

    public static InvoiceResponse toResponse(Invoice invoice) {
        if (invoice == null) {
            return null;
        }

        InvoiceResponse response = new InvoiceResponse();
        response.setId(invoice.getId());
        response.setInvoiceNumber(invoice.getInvoiceNumber());
        response.setCompanyName(invoice.getCompany().getCompanyName());
        response.setYear(invoice.getYear());
        response.setMonth(invoice.getMonth());
        response.setIssueDate(invoice.getIssueDate());
        response.setDueDate(invoice.getDueDate());
        response.setTotalAmount(invoice.getTotalAmount());
        response.setPaidAmount(invoice.getPaidAmount());
        response.setBalanceDue(invoice.getTotalAmount().subtract(invoice.getPaidAmount()));
        response.setStatus(invoice.getStatus());
        response.setPdfUrl(invoice.getPdfUrl());

        return response;
    }
}