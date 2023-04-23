import Link from "next/link";
import Layout from "../../../components/layouts/MainLayout";
import { useEffect, useState } from "react";
import { privatePage } from "../../../lib/ironSessionConfig";

const InfoProyecto = ({ user }) => {
    const [etapaValue, setEtapaValue] = useState(false);
    const [proyects, setProyects] = useState([])

    useEffect(() => {
        fetch("/api/projects")
            .then((response) => response.json())
            .then(setProyects)
            .catch((error) => toast("Error en el proyecto"))
    }, [])


    return <Layout title='Proyecto' user={user}>
        <div className="bg-white p-5 rounded-lg">

            <form className="flex flex-col w-[400px]">

                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Nombre del proyecto:
                </p>
                <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Prototipo de Gestor de proyectos modulares" />

                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Correo del alumno:
                </p>
                {/* <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="correoalumno1@universidad-une.com"/>        */}
                <div>
                    <input name="correo" type="text" className="border px-2 rounded-lg h-10" placeholder="Matrícula del alumno 1"/>
                    <span className="pl-1 font-semibold">@universidad-une.com</span>
                </div>

                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Correo del alumno:
                </p>
                {/* <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="correoalumno2@universidad-une.com" /> */}
                <div>
                    <input name="correo" type="text" className="border px-2 rounded-lg h-10" placeholder="Matrícula del alumno 2"/>
                    <span className="pl-1 font-semibold">@universidad-une.com</span>
                </div>


                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Etapa:
                </p>
                <select value={etapaValue} onChange={(e) => setEtapaValue(e.target.value)} name="modulo" className="bg-white border px-2 rounded-lg h-10">
                    <option value="opcion">Selecciona una etapa</option>
                    <option value="docetapa1">Etapa_1 Planteamiento del problema</option>
                    <option value="docetapa2">Etapa_2 Resumen del proyecto</option>
                    <option value="docetapa3">Etapa_3 Documentación final</option>
                </select>
            </form>
        </div>

        <div className="bg-white p-5 rounded-lg mt-8">
            <h1 className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">Documentos</h1>
            <div className="grid grid-cols-10 gap-5 auto-rows-auto">
                <Link
                    href={"/alumnos/proyectos/" + etapaValue}
                    className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
                >
                    <span className="text-gray-300 text-5xl material-icons">
                        add
                    </span>
                </Link>
            </div>
        </div>
    </Layout>
};

export const getServerSideProps = privatePage(async (context) => {
    const user = context.req.session.user;

    // fetch(/turuta/paraobtenerinformaciondeunproyecto/id)

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

export default InfoProyecto;