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

const Etapa1 = ({ user }) => {
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

    const onSubmitEvaluaEtapa1Form = useCallback(async () => {

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
            toast("Evaluación exitosa")
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
            toast("Evaluación exitosa")
        } catch (error) {
            toast.error("Error al evaluar")
        }

        setTimeout(() => {
            router.push(`/docentes/consultas/proyectos/${proyectId}`)
        }, 1000)
       
    }, [documentId, proyectId, proyecto])

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


    return <Layout title='Etapa-1 Estado del arte' user={user} >
        <Card className="p-4">
            <form className="flex flex-col">
                <div className='flex flex-col'>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Nombre:</span>
                    <span name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Arquitectura y programación de sistemas">
                        {documents && documents.DocEtapa1 && documents.DocEtapa1.length > 0 ? documents?.nombre : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Título:</span>
                    <span name="titulo" type="text" className="border px-2 rounded-lg h-10" placeholder="Título">
                        {documents && documents.DocEtapa1 && documents.DocEtapa1.length > 0 ? documents?.titulo : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Integrantes:</span>
                    <span name="resumen" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Un resumen de tu proyecto..." >
                        {proyects && proyects.usuarios && proyects.usuarios.map(up => <p>{up.usuario.correo}</p>)}
                    </span>

                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Resumen:</span>
                    <span name="resumen" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Un resumen de tu proyecto..." >
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa1 !== 'undefined' ?
                                documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.resumen : '' : '' : ''}
                    </span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Palabras Clave:</span>
                    <span name="palabrasClave" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Ingeniería, Software, etc...">
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa1 !== 'undefined' ?
                                documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.palabrasClave : '' : '' : ''}
                    </span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Introducción:</span>
                    <span name="introduccion" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Aquí coloca la introducción sobre tu proyecto...">
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa1 !== 'undefined' ?
                                documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.introduccion : '' : '' : ''}
                    </span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Desarrollo del tema:</span>
                    <span name="desarrollo" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Coloca el desarrollo base a tu proyecto...">
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa1 !== 'undefined' ?
                                documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.desarrollo : '' : '' : ''}
                    </span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Conclusión:</span>
                    <span name="conclusion" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Tu conclusión sobre tu proyecto...">
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa1 !== 'undefined' ?
                                documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.conclusion : '' : '' : ''}
                    </span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Referencias:</span>
                    <span name="referencias" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Las referencias donde sacaste ideas para tú proyecto...">
                        {typeof documents !== 'undefined' ?
                            typeof documents.DocEtapa1 !== 'undefined' ?
                                documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.referencias : '' : '' : ''}
                    </span>
                </div>
            </form>
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
                    onClick={onSubmitEvaluaEtapa1Form}
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

export default Etapa1;