import SidebarButton from "./SidebarButton";

const Sidebar = () => {
    return <aside className="w-64 flex flex-col py-10 px-5 border-r">

        <div className="justify-center mb-8 bg-center">
            <img src="FoxH3B.png" alt="Gestor de proyectos modulares" className="h-12" />
        </div>

        <div className="flex-grow mt-16">
            <SidebarButton href="/alumnos/proyectos" nombre="Proyectos" icono="description" />
            <SidebarButton href="/alumnos/modificaciones" nombre="Modificaciones" icono="edit" />
        </div>

        <div>
            <SidebarButton href="/alumnos/perfiles" nombre="Perfil" icono="manage_accounts" />
            <SidebarButton href="/api/logout" nombre="Salir" icono="logout" />
        </div>
    </aside>
}

export default Sidebar


{/* <span className="text-blue-800 text-3xl font-extrabold text-center">
            {/* Gestor <br />
            Modular 
        </span> */}