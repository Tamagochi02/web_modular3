import SidebarButton from "./SidebarButton";
import { privatePage } from "../lib/ironSessionConfig";

const Layout = ({ alumno, children, nombre, matricula, codigo }) => {
  return (
    <>
      <div className="flex flex-col w-screen h-screen">
        <header className="px-5 bg-blue-900 text-center h-12 flex items-center justify-between">
          <p className="ml-5 text-white font-serif flex text-center items-start px-14">
            Alumno
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
              <p className="text-blue-500 justify-center border-b border-blue-500 flex items-center">
                Documentación
              </p>
              <SidebarButton href="/dashboard_registro" nombre="Registrar" icono="description" />
              <SidebarButton href="/dashboard_modificaciones" nombre="Modificaciones" icono="note_alt" />
              <SidebarButton href="/dashboard_consultas" nombre="Consultas" icono="source" />
              <SidebarButton href="/dashboard_observaciones" nombre="Observaciones" icono="find_in_page" />
            </div>
            <div>
              <p className="text-blue-500 justify-center border-b border-blue-500 flex items-center">
                Configuraciones
              </p>
              <SidebarButton href="/dashboard_perfil" nombre="Perfil" icono="person"/>
              <a href="#" onClick={()=>{
                if(window.watsonInstance){
                  window.watsonInstance.destroySession()
                }
                window.location.href = "/api/logout"     
              }} className="hover:bg-blue-400 w-full flex items-center px-5 h-8 touch-auto">
                <span className="text-white mr-2 material-icons">exit_to_app</span>
                <span className="text-white font-serif flex items-center">
                  Salir
                </span>
              </a>
            </div>
          </aside>
          <div className="flex-grow ">{children}</div>
        </div>
      </div>
    </>
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

export default Layout;
