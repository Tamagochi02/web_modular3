import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import { useRouter } from 'next/router'
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modificaciones = ({ user }) => {

    const router = useRouter()
    const { id: proyectId } = router.query
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        Promise.all([
            fetch("/api/projects").then((response) => response.json()),
            fetch(`/api/projects/${proyectId}`).then((response) => response.json()),
            fetch(`/api/projects/${proyectId}/documents`).then((response) => response.json())
        ]).then(([projectsData,proyectPayload, documents]) => {
            setProyects(projectsData);
            setProyect(proyectPayload);
            setDocuments(documents)
        }).catch((error) => {
            toast("Error al obtener los datos");
        });
    }, [])

    return <Layout title='Modificaciones' user={user} >
        <Card className="p-4">
        <div className="bg-white p-5 rounded-lg mt-8">               

                {documents.map(documentos => <Link
                    href={`/alumnos/proyectos/${proyectId}/${documentos.id}/${documentos.etapa}`}
                    className=" rounded-md border-2 border-gray-300"
                >
                    <div class="px-6 py-4">
                        <div className=" font-bold text-xl mb-2 text-center"><p>{documentos.nombre}</p></div>

                        <div class=" pt-4 pb-2">
                            <span class="font-semibold "><p>Titulo:</p>{documentos.titulo}</span>

                        </div>
                        <div class=" pt-4 pb-2 text-center">

                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><p>{documentos.etapa}</p></span>
                        </div>

                        <div class="flex  justify-end">
                        <button type="submit" className=" text-red-600 font-bold rounded-lg material-icons">close</button>
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

export default Modificaciones;