import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from "react";
import Layout from "../../../../../../components/layouts/MainLayout";
import Card from "../../../../../../components/Card";
import { privatePage } from "../../../../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const estadoInicialProyecto = {
    observacion: '',
    estado: 'Debe_modificarse',
    evaluacion: 'Acreditado'
}

const Etapa2 = ({ user }) => {
    const router = useRouter()
    const { docid: documentId, id: proyectId } = router.query
    const [proyects, setProyects] = useState({})
    const [documents, setDocuments] = useState([])
    const [proyecto, setProyecto] = useState(estadoInicialProyecto)

    const handleChange = (event) => {
        const { name, value } = event.target
        setProyecto({
            ...proyecto,
            [name]: value
        })
    }

    const onSubmitEvaluaEtapa2Form = useCallback(async () => {

        const {
            observacion,
            estado,
            evaluacion
        } = proyecto

        try {
            const responseObservaciones = await fetch(`/api/documents/${documentId}/observaciones`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ observacion })
            })
            if (!responseObservaciones.ok) {
                throw new Error()
            }
            toast.success("Evaluación exitosa")
            
        } catch (error) {
            toast.error("Error al registrar observacion")
        }

        try {
            const responseEvaluar = await fetch(`/api/evaluarProyecto`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    estado,
                    evaluacion,
                    id: proyectId
                })
            })
            if (!responseEvaluar.ok) {
                throw new Error()
            }
            // toast.success("Evaluación exitosa")
        } catch (error) {
            // toast.error("Error al evaluar")
        }

        setTimeout(() => {
            router.push(`/docentes/consultas/proyectos/${proyectId}`)
        }, 1000)
       
    }, [documentId, proyectId, proyecto])

    useEffect(() => {
        Promise.all([
            fetch(`/api/projects/${proyectId}`).then((response) => response.json()),
            fetch(`/api/documents/${documentId}`).then((response) => response.json())
        ]).then(([pro, res]) => {
            setDocuments(res)
            setProyects(pro)
        }).catch((error) => {
            toast.error("Error al obtener los datos");
            console.log(error)
        });
    }, [])

    return <Layout title='Etapa 2 - Resumen' user={user} >
        <Card className="p-4">
            <form className="flex flex-col">
                <div className='flex flex-col'>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Nombre:</span>
                    <span name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Arquitectura y programación de sistemas">
                        {documents && documents.DocEtapa2 && documents.DocEtapa2.length > 0 ? documents?.nombre : ''}
                    </span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Título:</span>
                    <span name="titulo" type="text" className="border px-2 rounded-lg h-10" placeholder="Título">
                        {documents && documents.DocEtapa2 && documents.DocEtapa2.length > 0 ? documents?.titulo : ''}</span>

                    {/* <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Integrantes del proyecto:</span>

                    <span name="correos" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Describe la desripción de tu proyecto..." >
                        {proyects && proyects.usuarios && proyects.usuarios.map(up => <p>{up.usuario.correo}</p>)}</span> */}



                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Descripción</span>
                    <span name="descripcion" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Describe la desripción de tu proyecto..." >
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa2 !== 'undefined' ?
                                documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.descripcion : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Objetivo General</span>
                    <span name="objGeneral" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Los objetivos generales" >
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa2 !== 'undefined' ?
                                documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.objGeneral : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Objetivos y Metas Específicas</span>
                    <span name="objsMetas" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Aquí coloca los objetivos y metas de tu proyecto..." >
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa2 !== 'undefined' ?
                                documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.objsMetas : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Alcance</span>
                    <span name="alcance" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Coloca el alcance sobre tu proyecto..." >
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa2 !== 'undefined' ?
                                documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.alcance : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Herramientas</span>
                    <span name="herramientas" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Escribe las herramientas útilizadas en tu proyecto..." >
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa2 !== 'undefined' ?
                                documents.DocEtapa2.length > 0 ? documents.DocEtapa2[0]?.herramientas : '' : '' : ''}</span>
                </div>

            </form>

            {/* Boton  de visualizador de PDF */}

            <br />
            <button className="material-icons right-20"
                onClick={() => window.location.href = `/pdf/${documentId}/resumen`}
            >picture_as_pdf</button>
        </Card>

        <Card className="p-4">
            <div className="flex flex-col">
                <div className='flex flex-col'>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Estado:</span>
                    <select
                        name="estado"
                        className="bg-white border px-2 rounded-lg h-10"
                        value={proyecto.estado}
                        onChange={handleChange}
                    >
                        <option value="Debe_modificarse">Debe_modificarse</option>
                        <option value="Revisado">Revisado</option>
                    </select>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Evaluación:</span>
                    <select
                        name="evaluacion"
                        className="bg-white border px-2 rounded-lg h-10"
                        value={proyecto.evaluacion}
                        onChange={handleChange}
                    >
                        <option value="Acreditado">Acreditado</option>
                        <option value="No_acreditado">No_acreditado</option>
                    </select>
                </div>
                <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Observaciones Generales</span>
                <textarea
                    name="observacion"
                    id="message"
                    rows="" 
                    className="resize block border px-2 rounded-lg w-full h-32"
                    placeholder="Las observaciones al documento..."
                    value={proyecto.observacion}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="mt-5 bg-purple-900 font-bold text-white h-10 rounded-lg"
                    onClick={onSubmitEvaluaEtapa2Form}
                >
                    Calificar
                </button>
                <ToastContainer />
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

export default Etapa2;