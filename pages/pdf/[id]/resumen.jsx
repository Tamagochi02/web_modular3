import React from 'react';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Card from "../../../components/Card";

const handleDownload = async () => {
  const pdf = new jsPDF();
  const container = document.getElementById("pdf-container");

  const canvas = await html2canvas(container);
  const imgData = canvas.toDataURL("image/png");

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("Resumen.pdf");
};


const PDFContent = () => {
  const router = useRouter()
  const { id } = router.query
  const [documents, setDocuments] = useState()
  const [proyects, setProyects] = useState()

  useEffect(() => {
    Promise.all([
      fetch(`/api/documents/${id}`).then((response) => response.json())
    ]).then(([res]) => {
      setDocuments(res)
    }).catch((error) => {
      toast("Error al obtener los datos");
      console.log(error)
    });
  }, [id])

  if (!documents)
    return <p>Loading...</p>
  console.log(documents);
  console.log(documents.DocEtapa2);

  // código para obtener los datos y mostrar el contenido del PDF

  return (
    <Card>
      <button onClick={handleDownload} class="bg-blue-500 hover:bg-blue-400 text-gray-darkest font-bold py-2 px-4 rounded inline-flex items-center">
        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
        <span>Descargar</span>
      </button>

      <div id="pdf-container" className='felx flex-col container '>
        <div className='max-w-full mx-32'>
          <div className='flex justify-center'>
            <img src="/encabezado.jpeg" alt="" />
          </div>

          <div>
            <h1 className=' mt-4 text-center font-bold text-lg'>PROYECTO DEL MÓDULO</h1>
            <div className='text-center' name='nombre modulo'>
              <p className='text-center'>{documents.nombre}</p>
            </div>
            <h1 className=' mt-4 text-center font-bold text-lg'>TÍTULO</h1>
            <p className='text-center'>{documents.titulo}</p>
            <h1 className=' mt-4 text-center font-bold text-lg'>Descripción</h1>
            <p className=' text-center justify-center ml-56 text-lg max-w-full mx-32'>
              {typeof documents !== 'undefined' ?
                typeof documents.DocEtapa2 !== 'undefined' ?
                  documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.descripcion : '' : '' : ''}
            </p>
            {/* <h1 className=' mt-4 text-center font-bold text-lg'>Integrantes del proyecto:</h1> */}
            {/* <div className='flex justify-center mt-4'>
          <table>
            <thead>
              <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th className="bg-gray-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                <th className="bg-gray-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Código</th>
                <th className="bg-gray-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Matrícula</th>
                <th className="bg-gray-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Correo electrónico</th>

              </tr>

            </thead>
            <tbody>
              //{proyects && proyects.usuarios && proyects.usuarios.map((up, index) => ( 
              <tr>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
          </div> */}
          </div>

        </div>

        <div className='ml-56 mt-32 text-lg text-justify max-w-full mx-32'>
          <h1 className='font-bold '>Objetivo general</h1>
          <p className='indent-16'>
            {typeof documents !== 'undefined' ?
              typeof documents.DocEtapa2 !== 'undefined' ?
                documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.objGeneral : '' : '' : ''}
          </p>
          <br />
          <h1 className='font-bold'>Objetivos y metas específicas</h1>
          <p className='indent-16 '>
            {typeof documents !== 'undefined' ?
              typeof documents.DocEtapa2 !== 'undefined' ?
                documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.objsMetas : '' : '' : ''}
          </p>
          <br />
          <h1 className='font-bold'>Alcance</h1>
          <p className='indent-16 '>
            {typeof documents !== 'undefined' ?
              typeof documents.DocEtapa2 !== 'undefined' ?
                documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.alcance : '' : '' : ''}
          </p>
          <br />
          <h1 className='font-bold'>Herramientas</h1>
          <p className='indent-16'>
            {typeof documents !== 'undefined' ?
              typeof documents.DocEtapa2 !== 'undefined' ?
                documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.herramientas : '' : '' : ''}
          </p>
        </div>
        <br />
      </div>
    </Card>
  );
}

export default PDFContent;