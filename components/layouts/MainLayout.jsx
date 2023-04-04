import { Rol } from '@prisma/client';
import Sidebar from "./Sidebar";
import SidebarAdministrador from "./SidebarAdministrador";
import Navbar from "./Navbar";

const MainLayout = ({ title, user, children }) => {
  return (
    <>
      <div className="flex flex-grow">
        {
          user.rol == Rol.Administrador
            ? <SidebarAdministrador />
            : user.rol == Rol.Docente
              ? <h1>SIDEBAR DOCENTE</h1>
              : <Sidebar />
        }
        <div className="bg-gray-100 flex flex-col w-full h-screen">
          <Navbar title={title} user={user} />
          <div className="flex-grow px-8 py-4 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
