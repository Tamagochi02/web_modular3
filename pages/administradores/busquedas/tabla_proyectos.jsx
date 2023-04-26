import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'


const Proyectos = ({ user }) => {
    const router = useRouter()
    const { id: proyectId } = router.query

    const [proyectsId, setProyectsId] = useState([]);
    const [proyects, setProyects] = useState([]);
    const [administradores, setAdministradores] = useState([]);
    const [filtro, setFiltro] = useState('')
    const [status, setStatus] = useState(true);

    

    useEffect(() => {
        Promise.all([
            fetch(`/api/projects`).then((response) => response.json()),
            // fetch(`/api/projects${proyectId}`).then((response) => response.json()),
        ]).then(([proyectsData]) => {
            setProyects(proyectsData);
            // setProyectsId(proyectsDataId);
        }).catch((error) => {
            toast("Error al obtener usuarios");
        });
    }, []);
    console.log(proyects)

    return <Layout title='Proyectos' user={user} >
        <Card>
            <div className="overflow-x-auto" >
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
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Estado</th>
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Módulo</th>
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Evaluación</th>
                        </tr>
                    </thead>
                    <tbody >
                        {proyects.filter(p => p.nombre.toLowerCase().startsWith(filtro.toLowerCase())).map((proyectos) => (
                            <tr key={proyectos.id}>
                                <td nombre="nombre" className="border px-4 py-2" >{proyectos.nombre}</td>
                                <td nombre="estado" className="border px-4 py-2" >{proyectos.estado}</td>
                                <td nombre="modulo" className="border px-4 py-2" >{proyectos.modulo}</td>
                                <td nombre="evaluacion" className="border px-4 py-2" >{proyectos.evaluacion}</td>
                                
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

export default Proyectos;

