import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const NuevoProyecto = ({ user }) => {
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
            nombre: data.get('nombre'),
            modulo: data.get('modulo')
        }

        fetch("/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
            .then(() => router.push('/alumnos/proyectos'))
            .catch((error) => console.log(error))
    }

    return <Layout title='Estado del Arte' user={user} >
        <Card>
            <form onSubmit={onSubmitCreateProyectForm} className="flex flex-col">
                <div className='flex flex-col'>
                    <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Resumen</span>
                    <textarea id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Un resumen de tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Palabras Clave</span>
                    <textarea id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Ingeniería, Software, etc..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Introducción</span>
                    <textarea id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Aquí coloca la introducción sobre tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Desarrollo</span>
                    <textarea id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Coloca el desarrollo base a tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Conclusión</span>
                    <textarea id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Tu conclusión sobre tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Referencias</span>
                    <textarea id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Las referencias donde sacaste ideas para tú proyecto..." ></textarea>
                </div>
                {/* <button type="submit" className="mt-5 bg-blue-500 text-white h-10 rounded-lg">Crear</button> */}
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

export default NuevoProyecto;