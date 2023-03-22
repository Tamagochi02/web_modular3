import Layout from "../components/Layout";

const Observaciones = () => {
  return (
    <Layout>
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
                Asesor asignado:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Nombre del asesor ..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Nombre del proyecto:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Nombre del Proyecto..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Fecha de revisión:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Fecha de revisión ..."
                ></input>
              </p>
              <p className=" text-xl text-black col-span-2">
                Observación:
                <textarea id="message" rows="8" className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Observaciones del asesor..." readOnly ></textarea>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Observaciones;