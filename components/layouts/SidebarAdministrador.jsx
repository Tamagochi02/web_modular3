import SidebarButton from "./SidebarButton";

const SidebarAdministrador = () => {
    return <aside className="w-64 flex flex-col py-10 px-5 border-r">
        <span className="text-blue-500 text-3xl font-extrabold text-center">
            Gestor <br />
            Modulares
        </span>

        <div className="flex-grow mt-16">
            <SidebarButton href="/administradores/dashboard" nombre="Dashboard" icono="dashboard" />
            <SidebarButton href="/administradores/busquedas" nombre="Busquedas" icono="manage_search" />
            <SidebarButton href="/administradores/registros" nombre="Registros" icono="group_add" />
        </div>

        <div>
            <SidebarButton href="/administradores/perfiles" nombre="Perfil" icono="person" />
            <SidebarButton href="/api/logout" nombre="Salir" icono="exit_to_app" />
        </div>
    </aside>
}

export default SidebarAdministrador
