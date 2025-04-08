import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateCaseReport = (caseData, documents) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(`Case Report: ${caseData.case_name}`, 15, 20);
  
  // Add case details
  doc.setFontSize(12);
  doc.text(`Case ID: ${caseData.id}`, 15, 35);
  doc.text(`Type: ${caseData.case_type}`, 15, 45);
  doc.text(`Status: ${caseData.case_status}`, 15, 55);
  doc.text(`Next Hearing: ${caseData.next_hearing_date}`, 15, 65);
  
  // Add documents table
  doc.text('Case Documents:', 15, 80);
  
  const docData = documents.map(doc => [
    doc.name,
    doc.type || 'N/A',
    doc.description || 'N/A',
    doc.upload_date || 'N/A'
  ]);
  
  doc.autoTable({
    startY: 85,
    head: [['Name', 'Type', 'Description', 'Upload Date']],
    body: docData,
    theme: 'grid',
    styles: { fontSize: 10 }
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`,
      15,
      doc.internal.pageSize.height - 10
    );
  }
  
  doc.save(`Case_Report_${caseData.id}.pdf`);
};
