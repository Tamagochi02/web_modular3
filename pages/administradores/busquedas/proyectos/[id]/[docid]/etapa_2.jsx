import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Layout from "../../../../../../components/layouts/MainLayout";
import Card from "../../../../../../components/Card";
import { privatePage } from "../../../../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Etapa2 = ({ user }) => {
    const router = useRouter()
    const { docid: documentId, id: proyectId } = router.query
    const [documents, setDocuments] = useState([])
    const [proyects, setProyects] = useState([])

    const [estado, setEstado] = useState('')
    const [evaluacion, setEvaluacion] = useState('')

    useEffect(() => {
        Promise.all([
            fetch(`/api/documents/${documentId}`).then((response) => response.json())
        ]).then((res) => {
            setDocuments(res[0])
            

        }).catch((error) => {
            toast("Error al obtener los datos");
        });
    }, [])

    const onSubmitCreateEtapa2Form = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);

        const payload = {
            // estado: data.get('estado'),
            // evaluacion: data.get('evaluacion'),
            proyec: [data.get('estado'), data.get('evaluacion')],
            observaciones: data.get('observaciones')
        }

        fetch(`/api/documents/${documentId}/observaciones`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Evaluación exitosa")
                    setTimeout(() => {
                        router.push(`/administradores/busquedas/proyectos/${proyectId}`);
                    }, 3000);
                } else {
                    toast.error("Error al evaluar")
                }
            })
            .catch((error) => {
                toast.error("Error al evaluar");
            });

    }

    console.log(documentId)

    return <Layout title='Etapa 2 - Resumen' user={user} >
        <Card className="p-4">
            <form  className="flex flex-col">
                <div className='flex flex-col'>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Nombre:</span>
                    <span name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Arquitectura y programación de sistemas">{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa2 !== 'undefined' ?
                            documents.DocEtapa2.length > 0 ? documents?.nombre : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Título:</span>
                    <span name="titulo" type="text" className="border px-2 rounded-lg h-10" placeholder="Título">{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa2 !== 'undefined' ?
                            documents.DocEtapa2.length > 0 ? documents?.titulo : '' : '' : ''}</span>
                    
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Descripción</span>
                    <span name="descripcion" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Describe la desripción de tu proyecto..." >{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa2 !== 'undefined' ?
                            documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.descripcion : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Objetivo General</span>
                    <span name="objGeneral" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Los objetivos generales" >{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa2 !== 'undefined' ?
                            documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.objGeneral : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Objetivos y Metas Específicas</span>
                    <span name="objsMetas" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Aquí coloca los objetivos y metas de tu proyecto..." >{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa2 !== 'undefined' ?
                            documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.objsMetas : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Alcance</span>
                    <span name="alcance" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Coloca el alcance sobre tu proyecto..." >{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa2 !== 'undefined' ?
                            documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.alcance : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Herramientas</span>
                    <span name="herramientas" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Escribe las herramientas útilizadas en tu proyecto..." >{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa2 !== 'undefined' ?
                            documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.herramientas : '' : '' : ''}</span>
                </div>

            </form>
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

export default Etapa2;