import { useRouter } from 'next/router'
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../../../components/layouts/MainLayout";
import Card from "../../../../../components/Card";
import { privatePage } from "../../../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InfoProyecto = ({ user }) => {
    const router = useRouter()
    const { id: proyectId } = router.query

    

    const [etapaValue, setEtapaValue] = useState(false);
    const [documents, setDocuments] = useState([])
    const [proyects, setProyects] = useState([])
    const [proyect, setProyect] = useState()
    const [docentes, setDocentes] = useState([])
    const [alumnos, setAlumnos] = useState([])
    const [select1, setSelect1] = useState("");
    const [select2, setSelect2] = useState("");
    const [asesor, setAsesor] = useState("");

    const onSubmitCreateProyectForm = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);
        const { docid: documentId } = router.query


        if (asesor === "opcionAsesor") {
            toast.error("Debes seleccionar a un asesor");
            return;
        }
        if (select1 === select2) {
            toast.error("No puedes seleccionar el mismo integrante");
            return;
        }

        const payload = {
            nombre: data.get('nombre'),
            correo: data.get('correo'),
            nombre: data.get('nombreDocente')
        }

        fetch(`/api/projects/${proyectId}/documents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    toast("Registro exitoso")
                    setTimeout(() => {
                        router.reload()
                        // router.push(`/alumnos/proyectos/${proyectId}`);
                    }, 1000);
                } else {
                    toast("Error al crear el documento")
                }
            })
            .catch((error) => {
                toast.error("Error al crear el documento");
            });

    }


    useEffect(() => {
        Promise.all([
            fetch("/api/projects").then((response) => response.json()),
            fetch("/api/docentes").then((response) => response.json()),
            fetch("/api/alumnos").then((response) => response.json()),
            fetch(`/api/projects/${proyectId}`).then((response) => response.json()),
            fetch(`/api/projects/${proyectId}/documents`).then((response) => response.json())
        ]).then(([projectsData, docentesData, alumnosData, proyectPayload, documents]) => {
            setProyects(projectsData);
            setDocentes(docentesData);
            setAlumnos(alumnosData);
            setProyect(proyectPayload);
            console.log(documents)
            setDocuments(documents)
        }).catch((error) => {
            toast("Error al obtener los datos");
        });
    }, [])

    return <Layout title='' user={user} >

        <div className="bg-white p-5 rounded-lg mt-8">
            <h1 className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">Documentos</h1>
            <div className="grid grid-cols-6 gap-5 auto-rows-auto">
                
                {documents.map(documentos => <Link
                    href={`/administradores/busquedas/proyectos/${proyectId}/${documentos.id}/${documentos.etapa}`}
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

                        {/* <div class="flex  justify-end">
                        <button type="submit" className=" text-red-600 font-bold rounded-lg material-icons">close</button>
                    </div> */}
                    </div>
                </Link>)

                }

            </div>
        </div>
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

export default InfoProyecto;