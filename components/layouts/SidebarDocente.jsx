import SidebarButton from "./SidebarButton";

const SidebarDocente = () => {
    return <aside className="w-64 flex flex-col py-10 px-5 border-r">
        <span className="text-green-800 text-3xl font-extrabold text-center">
            Gestor <br />
            Modular
        </span>

        <div className="flex-grow mt-16">
            <SidebarButton href="/docentes/dashboard" nombre="Dashboard" icono="dashboard" />
            <SidebarButton href="/docentes/busquedas" nombre="Busquedas" icono="manage_search" />
            <SidebarButton href="/docentes/registros" nombre="Registros" icono="group_add" />
        </div>

        <div>
            <SidebarButton href="/docentes/perfiles" nombre="Perfil" icono="person" />
            <SidebarButton href="/api/logout" nombre="Salir" icono="exit_to_app" />
        </div>
    </aside>
}

export default SidebarDocente
