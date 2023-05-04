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
        <img src="encabezado.jpeg" alt="" />
      </div>

      <h1 className=' mt-4 text-center font-bold text-lg'>PROYECTO DEL MÓDULO</h1>
      <div className='text-center' name='nombre modulo'>
        <p></p>
      </div>
      <h1 className=' mt-4 text-center font-bold text-lg'>TÍTULO</h1>
      <h1 className=' mt-4 text-center font-bold text-lg'>Descripción</h1>
      <h1 className=' mt-4 text-center font-bold text-lg'>Integrantes del proyecto:</h1>
      <div className='flex justify-center mt-4'>
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
            {/* {proyects && proyects.usuarios && proyects.usuarios.map((up, index) => ( */}
            <tr>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>


      <h1 className=' ml-60 mt-4 font-bold text-lg '>Objetivo general</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg'>Objetivos y metas específicas</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg'>Alcance</h1>
      <h1 className=' ml-60 mt-4 font-bold text-lg'>Herramientas</h1>
    </div>
  );
}

export default PDFContent;