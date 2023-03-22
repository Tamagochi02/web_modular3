import Layout from "../components/Layout";
import React, { useState } from "react";

const Consultas = () => {

  //   const submitRegistro = () => {
  //     const payload = {
  //       fechaRegistro: new Date(),
  //       observacion: "",
  //       urldocumento,
  //       estado,
  //       id,
  //       docenteCodigo,
  //     };

  //     fetch("/api/etapa1", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     })
  //       .then((response) => response.json())
  //       .catch((error) => console.log(error))
  //       .then((json) => console.log(json));
  //   };

  return (
    <Layout nombre="Jazmin" matricula="A03440" codigo="Y1923553">
      <div className="flex items-center justify-center h-full font-serif text-left text-xl bg-slate-50">
        <div className="bg-slate-300 rounded shadow-xl">
          <form>
            <div className="grid grid-cols-2 gap-5 p-6 md:p-8 text-center md:text-left">
              <div className="w-full flex flex-col justify-end">
                <p className=" text-xl text-black-600 ">
                  Etapas:
                </p>
                <select
                  name="select"
                  className=" text-black-600 w-auto outline-double outline-3"
                >
                  <option value="etapa1">Etapa 1: Planteamiento del problema </option>
                  <option value="etapa2">Etapa 2: Resumen del protyecto </option>
                  <option value="etapa3">Etapa 3: Documentación final </option>
                </select>
              </div>
              <p className=" text-xl text-black ">
                Estado:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Estado ..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Modulo:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Modulo actual ..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Fecha de registro:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Fecha de registro ..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Nombre del documento:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Nombre del documento ..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Archivo PDF registrado:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Archivo PDF ..."
                ></input>
              </p>
            </div>
            <div>
            <table className="table-fixed border-separate border border-black">
                  <thead>
                    <tr className="border-black px-4 py-2 text-black">
                      <th className="border border-black">Nombre</th>
                      <th className="border border-black">Apellido paterno</th>
                      <th className="border border-black">Apellido materno</th>
                      <th className="border border-black">Matrícula</th>
                      <th className="border border-black">Código</th>
                      <th className="border border-black">Correo electrónico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-black px-4 py-2 text-black">
                      <td className="border border-black">Silvia Jazmin  </td>
                      <td className="border border-black">Castellanos</td>
                      <td className="border border-black">Ornelas</td>
                      <td className="border border-black">A03340</td>
                      <td className="border border-black">Y19832996</td>
                      <td className="border border-black">A03440@universidad-une.com</td>
                    </tr>
                    <tr className="border-black px-4 py-2 text-black">
                      <td className="border border-black">Miriam Tamara  </td>
                      <td className="border border-black">Hernández</td>
                      <td className="border border-black">Garcia</td>                      
                      <td className="border border-black">A03324</td>
                      <td className="border border-black">Y19833046</td>
                      <td className="border border-black">A03324@universidad-une.com</td>
                    </tr>
                    <tr className="border-black px-4 py-2 text-black">
                      <td className="border border-black">Andrea Sarai  </td>
                      <td className="border border-black">Valdivia</td>
                      <td className="border border-black">Mártinez</td>                      
                      <td className="border border-black">A06442</td>
                      <td className="border border-black">Y10554314</td>
                      <td className="border border-black">A06442@universidad-une.com</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Consultas;
