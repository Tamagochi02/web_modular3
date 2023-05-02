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
    const [documents, setDocuments] = useState()
    const [proyects, setProyects] = useState()

    const [estado, setEstado] = useState('')
    const [evaluacion, setEvaluacion] = useState('')



    const onSubmitEvaluaEtapa2Form = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);

        useEffect(() => {
            Promise.all([
                fetch(`/api/projects/${proyectId}`).then((response) => response.json()),
                fetch(`/api/documents/${documentId}`).then((response) => response.json()),
            ]).then(([pro, res]) => {
                setDocuments(res)
                setProyects(pro)
    
            }).catch((error) => {
                toast("Error al obtener los datos");
                console.log(error)
            });
        }, [])

        const payload = {
            observaciones: data.get('observaciones')
        }

        const payload1 = {
            estado: data.get('estado'),
            evaluacion: data.get('evaluacion'),
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
                        router.push(`/docentes/consultas/proyectos/${proyectId}`);
                    }, 3000);
                } else {
                    console.log(error)
                    toast.error("Error al evaluar")
                }
            })
            .catch((error) => {
                toast.error("Error al evaluar");
            });

        fetch(`/api/evaluarProyecto`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload1),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Evaluación exitosa")
                    setTimeout(() => {
                        router.push(`/docentes/consultas/proyectos/${proyectId}`);
                    }, 3000);
                } else {
                    toast.error("Error al evaluar")
                }
            })
            .catch((error) => {
                toast.error("Error al evaluar");
            });

    }

    // console.log(documentId)
    // console.log(proyects.correo)

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
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 text-center'>Integrantes del proyecto:</span>
                    <table>
                        <thead>
                            <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Correo electrónico</th>
                                
                            </tr>
                            
                        </thead>
                        <tbody>
                            {proyects && proyects.usuarios && proyects.usuarios.map((up, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{up.usuario.nombre}</td>
                                    <td className="border px-4 py-2">{up.usuario.correo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>




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
        </Card>

        <Card className="p-4">
            <form onSubmit={onSubmitEvaluaEtapa2Form} className="flex flex-col">
                <div className='flex flex-col'>

                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Estado:</span>
                    <select name="estado" value={estado} onChange={(event) => setEstado(event.target.value)} className="bg-white border px-2 rounded-lg h-10">
                        <option value="opcion">Selecciona el estado</option>
                        <option value="Modulo_2">Debe_modificarse</option>
                        <option value="Modulo_3">Revisado</option>
                    </select>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Evaluación:</span>
                    <select name="evaluacion" className="bg-white border px-2 rounded-lg h-10" value={evaluacion} onChange={(event) => setEvaluacion(event.target.value)}>
                        <option value="opcion">Selecciona la evaluación</option>
                        <option value="Modulo_1">Acreditado</option>
                        <option value="Modulo_2">No_acreditado</option>
                    </select>
                </div>
                <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Observaciones Generales</span>
                <textarea name="observaciones" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Objetivos Generales del documento..." ></textarea>
                {/* <button type="submit" className="mt-5 bg-blue-500 text-white h-10 rounded-lg">Crear</button> */}
                <button type="submit" className="mt-5 bg-purple-900 font-bold text-white h-10 rounded-lg">Calificar</button>
                <ToastContainer />
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