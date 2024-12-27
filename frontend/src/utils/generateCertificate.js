import { jsPDF } from "jspdf";

const addCertificateContent = (pdf, data) => {

    pdf.setFont("helvetica", "normal").setFontSize(12).setTextColor(100, 100, 100);
    pdf.text(`Hash do certificado: ${data.certificateHash}`, 250, 20, null, null, "right");

    pdf.setFont("helvetica", "bold").setFontSize(16).setTextColor(50, 50, 50);
    pdf.text("CERTIFICADO DE CONCLUSÃO", 20, 60); // Descendo a partir de 30 para 50

    pdf.setFont("helvetica", "bold").setFontSize(50).setTextColor(0, 0, 0);
    pdf.text(data.certificateTitle, 20, 90); // Descendo a partir de 50 para 70

    pdf.setFont("helvetica", "normal").setFontSize(14).setTextColor(100, 100, 100);
    pdf.text(`Entidade Emissora: ${data.issuerName}`, 20, 100); 

    pdf.setFont("helvetica", "bold").setFontSize(32).setTextColor(0, 0, 0);
    pdf.text(data.recipientName, 20, 150); 

    pdf.setFont("helvetica", "normal").setFontSize(14).setTextColor(100, 100, 100);
    pdf.text(`Data: ${data.issueDate}`, 20, 160);
};

export const generateCertificate = (data) => {
    const pdf = new jsPDF("landscape", "mm", "a4");
    addCertificateContent(pdf, data);

    const pdfBlob = pdf.output('blob');
    return pdfBlob;  
};