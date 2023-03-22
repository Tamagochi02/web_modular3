import Layout from "../components/Layout";

const Perfil = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-full font-serif text-left text-xl bg-slate-50">
        <div className="bg-slate-300 rounded shadow-xl">
          <form>
            <div className="grid grid-cols-2 gap-5 p-6 md:p-8 text-center md:text-left">
              {/* <div className="w-full flex flex-col justify-end">
                <p className=" text-xl text-black-600 ">
                  Usuario:
                </p>
                <select
                  name="select"
                  className=" text-black-600 w-auto outline-double outline-3"
                >
                  <option value="etapa1">Etapa 1: Planteamiento del problema </option>
                  <option value="etapa2">Etapa 2: Resumen del protyecto </option>
                  <option value="etapa3">Etapa 3: Documentación final </option>
                </select>
              </div> */}
              <p className=" text-xl text-black ">
                Usuario:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Usuario ..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Nombre:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Nombre ..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Apellido Paterno:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Apellido Paterno..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Apellido Materno:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Apellido Paterno..."
                ></input>
              </p>
              <p className=" text-xl text-black ">
                Correo Institucional:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Correo Institucional ..."
                ></input>
                
              </p>

              <p className=" text-xl text-black ">
                Contraseña:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Contraseña ..."
                ></input>
                
              </p>

              <p className=" text-xl text-black ">
                Re-escribe la contraseña:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" readOnly
                  placeholder="Contraseña ..."
                ></input>
                
              </p>
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

export default Perfil;