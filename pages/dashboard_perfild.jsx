import Layout from "../components/LayoutDocente";

const PerfilD = ({ icono }) => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-full font-serif text-left text-xl bg-slate-50">
        <div className="bg-violet-300 rounded shadow-xl">
          <form>
            <div className="flex gap-4 p-6 md:p-8 text-center md:text-left">
              <div id=" Primera columna" className="flex flex-col">
                <p className=" text-xl text-black">
                  Nombres:
                  <input
                    type="text"
                    className="text-black outline-double outline-3 w-full" 
                    placeholder="Nombre ..."
                  ></input>
                </p>
                <p className=" text-xl text-black mt-3">
                  Estado:
                  <input
                    type="text"
                    className="text-black outline-double outline-3 w-full" readOnly
                    placeholder="Estado actual ..."
                  ></input>
                </p>

                <p className=" text-xl text-black mt-3">
                  Apellido Paterno:
                  <input
                    type="text"
                    className="text-black outline-double outline-3 w-full" 
                    placeholder="Apellido Paterno..."
                  ></input>
                </p>

                <p className=" text-xl text-black mt-3">
                  Apellido Materno:
                  <input
                    type="text"
                    className="text-black outline-double outline-3 w-full" 
                    placeholder="Apellido Paterno..."
                  ></input>
                </p>

                <p className=" text-xl text-black mt-3">
                  Código:
                  <input
                    type="text"
                    className="text-black outline-double outline-3 w-full " readOnly
                    placeholder="Correo Institucional ..."
                  ></input>

                </p>
              </div>
              <div id="Segunda columna" className="flex flex-col">
                <label htmlFor="image-file">
                  <p className="items-center flex flex-col">
                    <span className="text-white material-icons text-9xl">
                      account_circle
                    </span>
                    Subir imagen
                  </p>
                  <input className="hidden" type="file" name="image-file" id="image-file" />
                </label>
{/* ... */}

                <p className=" text-xl text-black mt-12">
                  Correo Institucional:
                  <input
                    type="text"
                    className="text-black outline-double outline-3 w-full" readOnly
                    placeholder="Correo Institucional ..."
                  ></input>

                </p>
                <p className=" text-xl text-black mt-3">
                  Contraseña:
                  <input
                    type="text"
                    className="text-black outline-double outline-3 w-full" 
                    placeholder="Contraseña ..."
                  ></input>

                </p>
                <div className="flex justify-end mt-5">
                  <button className="text-white  rounded left ml-10 w-32 h-12 transition bg-purple-800 hover:-translate-y-1 hover:scale-110 hover:bg-blue duration-150">
                    Guardar 
                  </button>
                </div>
              </div>



            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PerfilD;