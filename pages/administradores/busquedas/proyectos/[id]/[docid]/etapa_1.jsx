import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Layout from "../../../../../../components/layouts/MainLayout";
import Card from "../../../../../../components/Card";
import { privatePage } from "../../../../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Etapa1 = ({ user }) => {
    const router = useRouter()
    const { docid: documentId, id: proyectId } = router.query
    const [proyects, setProyects] = useState({})
    const [documents, setDocuments] = useState([])
    const [observaciones, setObservacion] = useState([])

    useEffect(() => {
        Promise.all([
            fetch(`/api/documents/${documentId}`).then((response) => response.json()),
            fetch(`/api/documents/${documentId}/observaciones`).then((response) => response.json())
        ]).then(([res, observacionData]) => {
            setDocuments(res[0])
            setObservacion(observacionData)

        }).catch((error) => {
            toast("Error al obtener los datos");
        });
    }, [])


    return <Layout title='Etapa-1 Estado del arte' user={user} >
        <Card className="p-4">
            <form className="flex flex-col">
                <div className='flex flex-col'>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Nombre:</span>
                    <span name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Arquitectura y programación de sistemas">{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa1 !== 'undefined' ?
                            documents.DocEtapa1.length > 0 ? documents?.nombre : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Título:</span>
                    <span name="titulo" type="text" className="border px-2 rounded-lg h-10" placeholder="Título">{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa1 !== 'undefined' ?
                            documents.DocEtapa1.length > 0 ? documents?.titulo : '' : '' : ''}</span>


                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Resumen</span>
                    <span name="resumen" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Un resumen de tu proyecto..." >{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa1 !== 'undefined' ?
                            documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.resumen : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Palabras Clave</span>
                    <span name="palabrasClave" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Ingeniería, Software, etc...">{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa1 !== 'undefined' ?
                            documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.palabrasClave : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Introducción</span>
                    <span name="introduccion" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Aquí coloca la introducción sobre tu proyecto...">{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa1 !== 'undefined' ?
                            documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.introduccion : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Desarrollo del tema</span>
                    <span name="desarrollo" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Coloca el desarrollo base a tu proyecto...">{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa1 !== 'undefined' ?
                            documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.desarrollo : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Conclusión</span>
                    <span name="conclusion" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Tu conclusión sobre tu proyecto...">{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa1 !== 'undefined' ?
                            documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.conclusion : '' : '' : ''}</span>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Referencias</span>
                    <span name="referencias" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Las referencias donde sacaste ideas para tú proyecto...">{typeof documents !== 'undefined' ?
                        typeof documents.DocEtapa1 !== 'undefined' ?
                            documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.referencias : '' : '' : ''}</span>
                </div>

                <div className=" pt-4 pb-2">
                        <span className="font-semibold">
                            <p className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Observaciones:</p>
                            {observaciones && observaciones.length > 0 ? (
                                observaciones.map((obs, index) => (
                                    <div key={index}>
                                        {obs.observacion}
                                    </div>
                                ))
                            ) : (
                                <p>No hay observaciones</p>
                            )}
                        </span>
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

export default Etapa1;