import { Document, Page, Text, Image , View, StyleSheet, Table, TableCell, TableHeader } from '@react-pdf/renderer';

const PdfDocument = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    heading: {
      fontSize: 24,
      marginBottom: 10,
    },
    paragraph: {
      fontSize: 12,
      marginBottom: 10,
    },
    text: {
      margin: 12,
      fontSize: 12,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
        <Image
        style={styles.image}
        src="//Encabezado.png"
      />
      <Text style={styles.text}>
        PROYECTO DEL MÓDULO
      </Text>

      <Text style={styles.text}>
        Descripción
      </Text>
      <Text style={styles.text}>
        Integrantes del proyecto:
      </Text>
      <TableHeader>
        <TableCell>Header 1</TableCell>
        <TableCell>Header 2</TableCell>
        <TableCell>Header 3</TableCell>
      </TableHeader>
      <TableCell>Row 1, Column 1</TableCell>
      <TableCell>Row 1, Column 2</TableCell>
      <TableCell>Row 1, Column 3</TableCell>
      <TableCell>Row 1, Column 4</TableCell>
      <Text style={styles.text}>
        Objetivo general
      </Text>
      <Text style={styles.text}>
        Objetivos y metas específicas
      </Text>
      <Text style={styles.text}>
        Alcance
      </Text>
      <Text style={styles.text}>
        Herramientas
      </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;