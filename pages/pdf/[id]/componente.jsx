import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PDFContent from "./PDFContent";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFGenerator = () => {
  return (
    <Document>
      <Page>
        <PDFContent />
      </Page>
    </Document>
  );
};

export default PDFGenerator;
