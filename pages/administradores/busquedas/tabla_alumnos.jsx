import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const Alumno = ({ user }) => {
    const [alumnos, setAlumnos] = useState([])
    const [docentes, setDocentes] = useState([]);
    const [administradores, setAdministradores] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState("");
    const [filtro, setFiltro] = useState([])

    const filtrarAlumnos = () => {
        if (Array.isArray(user)) {
            return user.filter((alumno) =>
                alumno.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
                alumno.correo.toLowerCase().includes(filtro.toLowerCase())
            );
        } else {
            return [];
        }
    }
    const filtrarDocentes = () => {
        if (Array.isArray(user)) {
            return user.filter((docente) =>
                docente.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
                docente.correo.toLowerCase().includes(filtro.toLowerCase())
            );
        } else {
            return [];
        }
    }

    useEffect(() => {
        fetch("/api/alumnos")
            .then((response) => response.json())
            .then(setAlumnos)
            .catch((error) => console.log(error))

        fetch("/api/docentes")
            .then((response) => response.json())
            .then(setDocentes)
            .catch((error) => console.log(error))

        fetch("/api/administradores")
            .then((response) => response.json())
            .then(setAdministradores)
            .catch((error) => console.log(error))
    }, [])



    return <Layout title='Usuarios' user={user} >
        <Card>
            <div className="overflow-x-auto">
                <div className="mb-4">
                    <label htmlFor="filtro" className="mr-2">
                        Buscar:
                    </label>
                    <input
                        type="text"
                        id="filtro"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="border rounded px-2 py-1"
                    />
                </div>
                <table className="table-auto w-full">
                    <thead>
                        <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Correo electrónico</th>
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Rol</th>
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Matrícula</th>
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Estatus</th>
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {filtrarAlumnos().map((alumno) => ( */}
                        {alumnos.map((alumno) => (
                            <tr key={alumno.id}>
                                <td className="border px-4 py-2" contentEditable={true}>{alumno.nombre}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{alumno.correo}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{alumno.rol}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{alumno.matricula}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{alumno.estaActivo ? "Activo" : "No activo"}</td>
                                <td className="border px-4 py-2">
                                    <span class="inline-block w-1/3 md:hidden font-bold">Acciones</span>
                                    <button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                                    <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                </td>
                            </tr>
                        ))
                        }

                        {docentes.map((docente) => (
                            <tr key={docente.id}>
                                <td className="border px-4 py-2" contentEditable={true}>{docente.nombre}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{docente.correo}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{docente.rol}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{docente.matricula}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{docente.estaActivo ? "Activo" : "No activo"}</td>
                                <td className="border px-4 py-2">
                                    <span class="inline-block w-1/3 md:hidden font-bold">Acciones</span>
                                    <button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                                    <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                </td>
                            </tr>
                        ))
                        }

                        {administradores.map((admin, docente, alumno) => (
                            <tr key={admin.id}>
                                <td className="border px-4 py-2" contentEditable={true}>{admin.nombre}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{admin.correo}</td>
                                {/* <td className="border px-4 py-2">{admin.rol}</td> */}
                                <td className="border px-4 py-2">
                                    <select
                                        value={rolSeleccionado}
                                        onChange={(e) => setRolSeleccionado(e.target.value)}
                                    >
                                        <option value="administrador">{admin.rol}</option>
                                        <option value="docente">Docente</option>
                                        <option value="alumno">Alumno</option>
                                    </select>
                                </td>

                                <td className="border px-4 py-2" contentEditable={true}>{admin.matricula}</td>
                                <td className="border px-4 py-2" contentEditable={true}>{admin.estaActivo ? "Activo" : "No activo"}</td>
                                <td className="border px-4 py-2">
                                    <span class="inline-block w-1/3 md:hidden font-bold">Acciones</span>
                                    <button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                                    <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </Card>
    </Layout>
};

export const getServerSideProps = privatePage(async (context) => {
    const user = context.req.session.user;

    if (!user) {
        return {
            redirect: {
                destination: "/api/logout",
                permanent: false,
            },
        };
    }

    return { props: { user } }
});

export default Alumno;

