import { PDFDownloadLink, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

// Create a PDF Document
export const generateCaseReportPDF = (caseData) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    section: {
      marginBottom: 15,
    },
    label: {
      fontWeight: 'bold',
    },
    value: {
      marginLeft: 5,
    },
  });

  // Define the PDF document structure
  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Case Report</Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Case Name: </Text><Text style={styles.value}>{caseData.case_name}</Text>
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Case Status: </Text><Text style={styles.value}>{caseData.case_status}</Text>
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Court: </Text><Text style={styles.value}>{caseData.court_name}</Text>
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Next Hearing Date: </Text><Text style={styles.value}>{caseData.next_hearing_date}</Text>
        </Text>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={MyDocument} fileName="case-report.pdf">
      {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
  );
};