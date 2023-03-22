import Layout from "../components/Layout";
import { useState, useEffect } from "react";

const Registro = () => {
  const [asesores, setAsesores] = useState([])

  useEffect(() => {
    fetch("/api/docente")
      .then((res) => res.json())
      .then((json) => setAsesores(json))
  }, [])

  const addDocente = () => {
    const payload = {
      apellidoMat: 'asdasd', apellidoPat: 'asd', codigo, contrasena, correo, foto, nombre
    }
    fetch("/api/docente", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((json) => setAsesores(json))
  }

  const submitRegistro = () => {
    const payload = {
      fechaRegistro: new Date(),
      observacion: "",
      urldocumento,
      estado,
      id,
      docenteCodigo,
    };

    fetch("/api/etapa1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .then((json) => console.log(json));
  };

  return (
    // w-16 md:w-32 lg:w-48 responsive design
    <Layout>
      <div className="flex items-center justify-center h-full font-serif text-left text-xl bg-slate-50">
        <div className="bg-slate-300 rounded shadow-xl">
          <form>
            <div className="flex flex-col gap-5 p-6 md:p-8 text-center md:text-left">
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
                Escribe el nombre del proyecto:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" 
                  placeholder="Nombre del proyecto ..."
                ></input>
              </p>
              <p className=" text-xl text-black">
                Elige el archivo PDF que deseas subir:
              </p>
              <input type="file" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-700 file:text-white
                hover:file:bg-black"></input>
              <div className="flex justify-center gap-2">
                <p
                  id="asesor2Box"
                  className=" text-left text-xl text-black"
                >
                  Asesor:
                </p>
                <select
                  name="select"
                  className="  text-center bg-white text-black w-auto outline-double outline-3 "
                >
                  <option value="nothing">Selecciona </option>
                </select>
                <div className="w-3"></div>
                <p
                  id="modulo2Box"
                  className=" text-left text-xl text-black "
                >
                  Modulo:
                </p>

                <select
                  name="select"
                  className=" bg-white text-black w-auto outline-double outline-3 outline-offset-2 "
                >
                  <option value="nothing">Selecciona </option>
                  <option value="etapa1"> Modulo 1 </option>
                  <option value="etapa2"> Modulo 2 </option>
                  <option value="etapa3"> Modulo 3 </option>
                </select>
              </div>
              <div className="flex justify-end mt-3">
                  <button className="text-white  rounded left ml-10 w-32 h-12 transition bg-blue-900 hover:-translate-y-1 hover:scale-110 hover:bg-blue duration-150">
                    Registrar
                  </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Registro;
