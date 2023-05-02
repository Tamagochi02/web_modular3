import React from 'react';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import PDFContent from './PDFContent';

function PDFGenerator() {
  return (
    <div>
      <PDFDownloadLink document={
        <Document>
          <Page>
            <PDFContent />
          </Page>
        </Document>
      } fileName="mi-documento.pdf">
        Descargar PDF
      </PDFDownloadLink>
    </div>
  );
}

export default PDFGenerator;