import SidebarButton from "./SidebarButton";

const Sidebar = () => {
    return <aside className="w-64 flex flex-col py-10 px-5 border-r">
        <span className="text-blue-800 text-3xl font-extrabold text-center">
            Gestor <br />
            Modular
        </span>

        <div className="flex-grow mt-16">
            <SidebarButton href="/alumnos/dashboard" nombre="Dashboard" icono="dashboard" />
            <SidebarButton href="/alumnos/proyectos" nombre="Proyectos" icono="description" />
            <SidebarButton href="/alumnos/modificaciones" nombre="Modificaciones" icono="edit" />
            <SidebarButton href="/alumnos/consultas" nombre="Consultas" icono="source" />
        </div>

        <div>
            <SidebarButton href="/alumnos/perfiles" nombre="Perfil" icono="person" />
            <SidebarButton href="/api/logout" nombre="Salir" icono="exit_to_app" />
        </div>
    </aside>
}

export default Sidebar
