const Navbar = ({ title, user }) => {
    return <navbar className="px-5 mt-5 h-14 flex items-center justify-between">
        <p className="text-2xl font-semibold">
            {title}
        </p>
        <div>
            <p>{user.nombre}</p>
            <p className="text-xs text-right">{user.rol}</p>
        </div>
    </navbar>
}

export default Navbar
