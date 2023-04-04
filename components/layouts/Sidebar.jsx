import SidebarButton from "./SidebarButton";

const Sidebar = () => {
    return <aside className="w-64 flex flex-col py-10 px-5 border-r">
        <span className="text-blue-500 text-3xl font-extrabold text-center">
            Gestor <br />
            Modulares
        </span>

        <div className="flex-grow mt-16">
            <SidebarButton href="/alumnos/dashboard" nombre="Dashboard" icono="dashboard" />
            <SidebarButton href="/alumnos/proyectos" nombre="Proyectos" icono="description" />
            <SidebarButton href="/dashboard_modificaciones" nombre="Modificaciones" icono="edit" />
            <SidebarButton href="/dashboard_consultas" nombre="Consultas" icono="source" />
            <SidebarButton href="/dashboard_observaciones" nombre="Observaciones" icono="find_in_page" />
        </div>

        <div>
            <SidebarButton href="/dashboard_perfil" nombre="Perfil" icono="person" />
            <SidebarButton href="/api/logout" nombre="Salir" icono="exit_to_app" />
        </div>
    </aside>
}

export default Sidebar
