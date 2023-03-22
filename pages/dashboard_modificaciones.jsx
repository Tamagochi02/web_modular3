import Layout from "../components/Layout";

const Modificaciones = () => {
  return (
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
              <div className="flex justify-end mt-3">
                <button className="text-white  rounded left ml-10 w-32 h-12 transition bg-blue-900 hover:-translate-y-1 hover:scale-110 hover:bg-blue duration-150">
                  Modificar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Modificaciones;