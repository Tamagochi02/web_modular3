import SidebarButtonD from "./SidebarButtonD";
import dashboard from "../pages/dashboard";
import Link from "next/link";
import { privatePage } from "../lib/ironSessionConfig";

const LayoutD = ({ children, nombre, codigo }) => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <header className="px-5 bg-purple-800 text-right h-12 flex items-center justify-between">
        <p className="ml-5 text-white font-serif flex text-center items-center px-14">
          Docente
        </p>
        <p className="flex">
          <span className="text-white mr-2 material-icons">
            account_circle{" "}
          </span>
          <span className="text-white font-serif  flex items-center">
            {" "}
            {nombre}
          </span>
        </p>
      </header>

      <div className="flex flex-grow">
        <aside className="w-64 flex flex-col justify-evenly bg-gray-800">
          <div className="flex flex-col items-center">
            <span className="text-white flex justify-center material-icons text-9xl">
              account_circle
            </span>
          </div>
          {/* <label htmlFor="image-file">
            <p className="items-center flex flex-col">
              <span className="text-white material-icons text-9xl">
                account_circle
              </span>
            </p>
            <input className="hidden" type="file" name="image-file" id="image-file" />
          </label> */}
          <div>
            <p className="text-purple-500 justify-center border-b border-purple-500 flex items-center">
              Documentación
            </p>
            <SidebarButtonD href="/dashboard_consultasd" nombre="Consulta" icono="find_in_page" />
          </div>
          <div>
            <p className="text-purple-500 justify-center border-b border-purple-500 flex items-center">
              Configuraciones
            </p>
            <SidebarButtonD href="/dashboard_perfild" nombre="Perfil" icono="person" />
            <SidebarButtonD nombre="Salir" icono="exit_to_app" />
          </div>
        </aside>
        <div className="flex-grow ">{children}</div>
      </div>
    </div>
  );
};

// rutas protegidas
export const getServerSideProps = privatePage((context) => {
  const user = context.req.session.user; //si hay un usuario
  if (!user) {
    return {
      redirect: {
        destination: "/api/logout",
        permanent: false,
      },
    };

  }
  return {
    props: {},
  };
});

export default LayoutD;
