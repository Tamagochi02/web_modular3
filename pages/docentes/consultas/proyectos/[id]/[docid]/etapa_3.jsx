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

const DoceEtapa2 = ({ user }) => {
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

    const payload = {
        "media": {
            "ext": "pdf",
            "b64": ""
        },
        "description": ""
    };



    const handleFileSelected = async (event) => {
        event.preventDefault();

        const file = Array.from(event.target.file ?? []);
        console.log("files:", file);
        const fileb64 = await convertBase64(file);
        payload.media.b64 = fileb64;



        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error al cargar archivo: ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log("Respuesta del servidor:", responseData);

            toast("Archivo cargado");

            const response1 = await fetch(`api/documents/${documentId}/etapa3`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 'url': responseData.media })
            });

            if (!response1.ok) {
                console.log(response1);
                throw new Error(`Error al actualizar el documento: ${response1.statusText}`);
            }

            toast("Archivo vinculado a la etapa 3 del documento");
        } catch (error) {
            console.error("Error al cargar archivo:", error.message);
            toast.error(`Error al cargar archivo: ${error.message}`);
        }

    };

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

    return <Layout title='Etapa 3 - Informe Final' user={user} >
        <Card>
            <form className="flex flex-col">

                <div className='max-w-2xl mx-auto text-center'>
                    <label
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-black uppercase'
                        htmlFor='file_input'
                    >
                        Documento:
                    </label>

                    <button class="bg-gray-300 hover:bg-gray-500 text-gray-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                        <span className='material-icons'>picture_as_pdf</span>
                        <span className='ml-2'>Descargar</span>
                    </button>

                    <p className='mt-5 text-center block mb-2 text-sm font-medium text-gray-900 dark:text-black uppercase'>
                        Descarga el Informe Final en formato
                        <a className='text-red-700' target='_blank'>
                            {' '}
                            pdf
                        </a>
                        .
                    </p>
                </div>

                {/* <div class="flex w-full h-screen items-center justify-center bg-grey-lighter">
                    <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-700 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                            <path d="M251 896q-88 0-149.5-61.5T40 685q0-79 50.5-137.5T217 477q15-84 82-148.5T451 264q24 0 42 13.5t18 36.5v294l83-83 43 43-156 156-156-156 43-43 83 83V319q-86 11-135 75.5T267 534h-19q-61 0-104.5 43T100 685q0 65 45 108t106 43h500q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-68-33-117.5T570 338v-65q81 29 129.5 101T748 534v24q72-2 122 46t50 123q0 69-50 119t-119 50H251Zm229-347Z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Descargar PDF</span>
                        <input type='file' class="hidden" />
                    </label>
                </div> */}
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

export default DoceEtapa2;