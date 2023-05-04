import React from 'react';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";



const PDFContent = () => {
  const router = useRouter()
  const { docid: documentId, id: proyectId } = router.query
  const [documents, setDocuments] = useState()
  const [proyects, setProyects] = useState()

  useEffect(() => {
    Promise.all([
      fetch(`/api/projects/${proyectId}`).then((response) => response.json()),
      fetch(`/api/documents/${documentId}`).then((response) => response.json())
    ]).then(([pro, res]) => {
      setDocuments(res)
      setProyects(pro)
    }).catch((error) => {
      toast("Error al obtener los datos");
      console.log(error)
    });
  }, [])

  return (
    <div className='felx flex-col container'>
      <div className='flex justify-center'>
        <img src="logo.png" alt="" className=" mt-20 w-full lg:w-1/3 xl:w-1/5" />
      </div>

      <div className=' mt-4 text-center font-bold text-lg'>
        <h1 className=''>CENTRO UNIVERSITARIO UNE</h1>
        <h1 className=''>INGENIERÍA EN COMPUTACIÓN</h1>
        <h1 className=''>PROYECTO MODULAR</h1>
      </div>
      
      <p className='text-center'>Obtener el módulo y el nombre</p>
      <h1 className=' mt-4 text-center font-bold text-lg'>ESTADO DEL ARTE</h1>
      <p className='text-center'>Obtener el nombre o titulo del proyecto</p>
      <h1 className=' mt-4 text-center font-bold text-lg'>INTEGRANTES:</h1>
      <p className='text-center'>Obtener los integrantes</p>

      <h1 className=' mt-4 text-center font-bold text-lg'>INDICE</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg text-blue-500'>Contenido</h1>
      <div className=' ml-60 mt-4 font-bold text-lg '>

        <h1 className=''>RESUMEN</h1>
        <h1 className=''>PALABRAS CLAVE</h1>
        <h1 className=''>INTRODUCCIÓN</h1>
        <h1 className=''>DESARROLLO DEL TEMA</h1>
        <h1 className=''>CONCLUSIONES</h1>
        <h1 className=''>REFERENCIAS</h1>

      </div>

      {/* 
      <h1 className=' ml-60 mt-4 font-bold text-lg '>RESUMEN</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg'>PALABRAS CLAVE</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg'>INTRODUCCIÓN</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg'>DESARROLLO DEL TEMA</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg'>CONCLUSIONES</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg'>REFERENCIAS</h1> */}
    </div>


  );
}

export default PDFContent;