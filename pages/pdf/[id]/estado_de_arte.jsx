import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import jsPDF from "jspdf";

const handleDownload = async () => {
  const pdfBlob = await window.pdf(document.getElementById("pdf-container")).toBlob();
  saveAs(pdfBlob, "archivo.pdf");
};

const PDFContent = () => {
  const router = useRouter()
  const { id } = router.query
  const [documents, setDocuments] = useState([])
  const [documentos, setDocumentos] = useState([]);


  useEffect(() => {
    Promise.all([
      fetch(`/api/documents/${id}`).then((response) => response.json())
    ]).then(([res]) => {
      setDocuments(res)
      console.log(res);

    }).catch((error) => {
      toast("Error al obtener los datos");
      console.log(error)
    });
  }, [id])


  if (!documents)
    return <p>Loading...</p>
  console.log(documents);



  // Tu código para obtener los datos y mostrar el contenido del PDF

  return (
    <div id="pdf-container" className="felx flex-col container">
      {/* Tu código para mostrar el contenido del PDF */}

      <div className='flex justify-center'>
        <img src="logo.png" alt="" className=" mt-20 w-full lg:w-1/3 xl:w-1/5" />
      </div>

      <div className=' mt-4 text-center font-bold text-lg'>
        <h1 className=''>CENTRO UNIVERSITARIO UNE</h1>
        <h1 className=''>INGENIERÍA EN COMPUTACIÓN</h1>
        <h1 className=''>PROYECTO MODULAR</h1>
      </div>

      <p className='text-center'>
      </p>
      <p className='text-center'>{documents.nombre}</p>
      <h1 className=' mt-4 text-center font-bold text-lg'>ESTADO DEL ARTE</h1>
      <p className='text-center'>{documents.titulo}</p>
      {/* <h1 className=' mt-4 text-center font-bold text-lg'>INTEGRANTES:</h1>
      <p className='text-center'>Obtener los integrantes</p> */}

      <h1 className=' mt-4 text-center font-bold text-lg'>INDICE</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg text-blue-500'>Contenido</h1>
      <div className=' ml-60 mt-4 font-bold text-lg '>

        <h1 className=''>RESUMEN</h1>
        <h1 className=''>PALABRAS CLAVE</h1>
        <h1 className=''>INTRODUCCIÓN</h1>
        <h1 className=''>DESARROLLO DEL TEMA</h1>
        <h1 className=''>CONCLUSIONES</h1>
        <h1 className=''>REFERENCIAS</h1>

        <br />

      </div>


      <div className='ml-45 mt-4 text-lg text-justify'>
        <h1 className='font-bold'>RESUMEN</h1>
        {/* <p className=''>{documents.DocEtapa1[0]?.resumen}</p> */}
        <h1 className='font-bold'>PALABRAS CLAVE</h1>
        {/* <p className=''>{documents.DocEtapa1[0]?.palabrasClave}</p> */}
        <h1 className='font-bold'>INTRODUCCIÓN</h1>
        {/* <p className=''>{documents.DocEtapa1[0]?.introduccion}</p> */}
        <h1 className='font-bold'>DESARROLLO DEL TEMA</h1>
        {/* <p className=''>{documents.DocEtapa1[0]?.desarrollo}</p> */}
        <h1 className='font-bold'>CONCLUSIONES</h1>
        {/* <p className=''>{documents.DocEtapa1[0]?.conclusion}</p> */}
        <h1 className='font-bold'>REFERENCIAS</h1>
        {/* <p className=''>{documents.DocEtapa1[0]?.referencias}</p> */}
      </div>



      <button onClick={handleDownload}>Descargar PDF</button>


      {/* <div dir="rtl">
        <div className="relative h-32 w-32">
          <div class="w-64 flex flex-col px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-700 hover:text-white">
            <button onClick={handleDownload} class="mt-2 text-base leading-normal"

            >
              Descargar PDF

            </button>

          </div>
        </div>
      </div> */}
    </div>


  );
};

export default PDFContent;
