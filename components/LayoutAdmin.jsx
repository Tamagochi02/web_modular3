import SidebarButtonA from "./SidebarButtonA";
import Link from "next/link";
import { privatePage } from "../lib/ironSessionConfig";

const LayoutAdmin = ({ children, nombre, user, estado, codigo }) => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <header className="px-5 bg-green-800 text-right h-12 flex items-center justify-between">
        <p className="ml-5 text-white font-serif flex text-center items-start px-14">
          Admin
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
          <div>
            <p className="text-green-500 justify-center border-b border-green-500 flex items-center">
              Documentación
            </p>
            <SidebarButtonA href="/dashboard_busquedas" nombre="Busquedas" icono="format_list_bulleted" />
            <SidebarButtonA href="/dashboard_registrarA" nombre="Registrar" icono="note_add" />
          </div>
          <div>
            <p className="text-green-500 justify-center border-b border-green-500 flex items-center">
              Configuraciones
            </p>
            <SidebarButtonA nombre="Perfil" icono="person"/>
            <SidebarButtonA nombre="Salir" icono="exit_to_app"/>
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

export default LayoutAdmin;
