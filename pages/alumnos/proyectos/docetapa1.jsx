import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const DoceEtapa1 = ({ user }) => {
    const [proyects, setProyects] = useState([])

    useEffect(() => {
        fetch("/api/projects")
            .then((response) => response.json())
            .then(setProyects)
            .catch((error) => toast("Error al crear el proyecto"))
    }, [])

    const router = useRouter()

    const onSubmitCreateProyectForm = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);

        const payload = {
            resumen: data.get('resumen'),
            palabras: data.get('palabrasClave'),
            introduccion: data.get('introduccion'),
            desarrollo: data.get('desarrollo'),
            conclusion: data.get('conclusion'),
            referencias: data.get('referencias')
        }

        fetch("/api/projects/documents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
            .then(() => router.push('/alumnos/proyectos/'))
            .catch((error) => console.log(error))
    }

    return <Layout title='Etapa 1 - Estado del Arte' user={user} >
        <Card>
            <form onSubmit={onSubmitCreateProyectForm} className="flex flex-col">
                <div className='flex flex-col'>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Resumen</span>
                    <textarea name="resumen" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Un resumen de tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Palabras Clave</span>
                    <textarea name="palabras" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Ingeniería, Software, etc..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Introducción</span>
                    <textarea name="introduccion"  id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Aquí coloca la introducción sobre tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Desarrollo del tema</span>
                    <textarea name="desarrollo" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Coloca el desarrollo base a tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Conclusión</span>
                    <textarea name="conclusion"  id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Tu conclusión sobre tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Referencias</span>
                    <textarea name="referencias"  id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Las referencias donde sacaste ideas para tú proyecto..." ></textarea>
                </div>

                {/* <button type="submit" className="mt-5 bg-blue-500 text-white h-10 rounded-lg">Crear</button> */}
                <div dir="rtl">
                    <div class="relative h-32 w-32">
                        <button type="submit" className="mt-5 bg-blue-900 text-white rounded-lg absolute inset-x-0 top-0 h-16 font-bold">Guardar</button>
                    </div>
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

export default DoceEtapa1;