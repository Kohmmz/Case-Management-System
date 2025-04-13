import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const PDFGenerator = ({ caseData }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
    },
    section: {
      marginBottom: 10,
    },
    heading: {
      fontSize: 18,
      fontWeight: "bold",
    },
    bodyText: {
      fontSize: 12,
      marginBottom: 6,
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Case Summary</Text>
          <Text style={styles.bodyText}><strong>Title:</strong> {caseData.title}</Text>
          <Text style={styles.bodyText}><strong>Client:</strong> {caseData.client_name}</Text>
          <Text style={styles.bodyText}><strong>Status:</strong> {caseData.status}</Text>
          <Text style={styles.bodyText}><strong>Type:</strong> {caseData.type}</Text>
          <Text style={styles.bodyText}><strong>Next Hearing:</strong> {caseData.next_hearing}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;