import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Proyectos = ({ user }) => {
    const [proyects, setProyects] = useState([])

    useEffect(() => {
        fetch("/api/projects")
            .then((response) => response.json())
            .then(setProyects)
            .catch((error) => toast("Error en el proyecto"))
    }, [])

    return <Layout title='Proyectos' user={user} >
        <Card className="p-4">
            <div className="grid grid-cols-5 gap-5 auto-rows-auto">
                {/* {proyects.length < 3 ?  */}
                {<Link
                    href={"/alumnos/proyectos/new"}
                    className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
                >
                    <span className="text-gray-300 text-5xl material-icons">
                        add
                    </span>
                </Link>
                }
                {
                    proyects.map(proyecto => <Link
                        href={`/alumnos/proyectos/${proyecto.id}`}
                        className=" rounded-md border-2 border-gray-300"
                    >
                        {/* <div class="max-w-sm rounded overflow-hidden shadow-lg"> */}
                        <div class="px-6 py-4">
                            <div className=" font-bold text-xl mb-2 text-center"><p>{proyecto.nombre}</p></div>

                            <div class="px-6 pt-4 pb-2 text-center">
                                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><p>{proyecto.modulo}</p></span>
                                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><p>{proyecto.estado}</p></span>
                                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><p>{proyecto.evaluacion}</p></span>
                            </div>
                        </div>
                    </Link>)

                }
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