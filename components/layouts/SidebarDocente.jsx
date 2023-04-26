import SidebarButton from "./SidebarButton";

const SidebarDocente = () => {
    return <aside className="w-64 flex flex-col py-10 px-5 border-r">
        <span className="text-purple-700 text-3xl font-extrabold text-center">
            Gestor <br />
            Modular
        </span>

        <div className="flex-grow mt-16">
            <SidebarButton href="/docentes/consultas/proyectos" nombre="Consultas" icono="manage_search" />
        </div>

        <div>
            <SidebarButton href="/docentes/perfiles" nombre="Perfil" icono="manage_accounts" />
            <SidebarButton href="/api/logout" nombre="Salir" icono="logout" />
        </div>
    </aside>
}

export default SidebarDocente
