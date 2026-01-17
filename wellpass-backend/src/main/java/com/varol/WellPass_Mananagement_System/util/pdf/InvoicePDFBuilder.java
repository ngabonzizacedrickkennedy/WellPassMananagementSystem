package com.varol.WellPass_Mananagement_System.util.pdf;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.varol.WellPass_Mananagement_System.model.billing.Invoice;

public class InvoicePDFBuilder {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMM dd, yyyy");

    public static byte[] buildInvoicePDF(Invoice invoice) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(writer);
            Document document = new Document(pdfDocument);

            document.add(new Paragraph("INVOICE").setBold().setFontSize(24));
            document.add(new Paragraph("\n"));

            document.add(new Paragraph("Invoice Number: " + invoice.getInvoiceNumber()));
            document.add(new Paragraph("Company: " + invoice.getCompany().getCompanyName()));
            document.add(new Paragraph("Issue Date: " + invoice.getIssueDate().format(DATE_FORMATTER)));
            document.add(new Paragraph("Due Date: " + invoice.getDueDate().format(DATE_FORMATTER)));
            document.add(new Paragraph("\n"));

            Table table = new Table(new float[]{3, 1, 2, 2});
            table.addHeaderCell("Description");
            table.addHeaderCell("Qty");
            table.addHeaderCell("Unit Price");
            table.addHeaderCell("Total");

            invoice.getItems().forEach(item -> {
                table.addCell(item.getDescription());
                table.addCell(String.valueOf(item.getQuantity()));
                table.addCell(item.getUnitPrice().toString());
                table.addCell(item.getTotalPrice().toString());
            });

            document.add(table);
            document.add(new Paragraph("\n"));

            document.add(new Paragraph("Total Amount: " + invoice.getTotalAmount()).setBold());
            document.add(new Paragraph("Paid Amount: " + invoice.getPaidAmount()));
            document.add(new Paragraph("Balance Due: " +
                    invoice.getTotalAmount().subtract(invoice.getPaidAmount())).setBold());

            document.close();
            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to build invoice PDF", e);
        }
    }
}