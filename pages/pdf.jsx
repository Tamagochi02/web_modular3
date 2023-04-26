import { Document, Page, Text, Image , View, StyleSheet, TOC } from '@react-pdf/renderer';

const PdfDocument = () => {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });

  return (
    <Document>
  <Page style={styles.body}>
    <View style={styles.section}>
      <Text style={styles.title} br>CENTRO UNIVERSITARIO UNE</Text >
      <Text br />
      <Text style={styles.title}>INGENIERIA EN COMPUTACION</Text>
      <Text br />
      <Text style={styles.text}> ESTADO DEL ARTE "llamar el titulo del proyecto" </Text>
      <Text br />
      <Text style={styles.text}> ""llamar a los integrantes del proyecto" </Text>
      <Text br />
    </View>
  </Page>
</Document>
  );
};

export default PdfDocument;
