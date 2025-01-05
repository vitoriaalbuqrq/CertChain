import { jsPDF } from "jspdf";

const addCertificateContent = (pdf, data) => {
  const pageWidth = pdf.internal.pageSize.width; 
  const margin = 20; 
  const maxWidth = pageWidth - 2 * margin; 
  let currentY = 20; 

  const addText = (text, fontSize, fontStyle, textColor) => {
    pdf.setFont("helvetica", fontStyle).setFontSize(fontSize).setTextColor(...textColor);

    const lines = pdf.splitTextToSize(text, maxWidth);
    const lineHeight = fontSize * 0.5; 

    if (lines.length > 2) {
      fontSize = Math.max(fontSize - 2, 10);
      pdf.setFontSize(fontSize);
    }

    lines.forEach((line) => {
      pdf.text(line, margin, currentY);
      currentY += lineHeight;
    });
  };

  addText(`ID do certificado: ${data.hash}`, 12, "normal", [100, 100, 100]);
  currentY += 10;

  addText("CERTIFICADO DE CONCLUSÃO", 16, "bold", [50, 50, 50]);
  currentY += 20;

  addText(data.certificateTitle, 42, "bold", [0, 0, 0]);
  currentY += 20;

  addText(`Entidade Emissora: ${data.issuerName}`, 14, "normal", [100, 100, 100]);
  currentY += 10;

  addText(data.recipientName, 28, "bold", [0, 0, 0]);
  currentY += 10;

  addText(`Data: ${data.issueDate}`, 14, "normal", [100, 100, 100]);
};

export const generateCertificate = (data) => {
  const pdf = new jsPDF("landscape", "mm", "a4");
  addCertificateContent(pdf, data);

  const pdfBlob = pdf.output("blob");
  return pdfBlob;
};
