import Link from "next/link";
import Layout from "../../../components/layouts/MainLayout";
import { useEffect, useState } from "react";
import { privatePage } from "../../../lib/ironSessionConfig";

const InfoProyecto = ({ user, proyect }) => {
    const [etapaValue, setEtapaValue] = useState(false);


    return <Layout title='Proyecto' user={user}>
        <div className="bg-white p-5 rounded-lg">

            <form className="flex flex-col w-[400px]">


                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Nombre del proyecto:
                </p>
                <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Arquitectura y programación de sistemas" />

                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Titulo:
                </p>
                <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Prototipo de Gestor de proyectos modulares" />

                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Etapa:
                </p>
                <select value={etapaValue} onChange={(e) => setEtapaValue(e.target.value)} name="modulo" className="bg-white border px-2 rounded-lg h-10">
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