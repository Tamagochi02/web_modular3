import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NuevoProyecto = ({ user }) => {

    const [nombre, setNombre] = useState('')
    const [modulo, setModulo] = useState('')

    const [alumnos, setAlumnos] = useState([])
    const [select1, setSelect1] = useState("");
    const [select2, setSelect2] = useState("");
    const [asesor, setAsesor] = useState("");


    useEffect(() => {
        Promise.all([
            fetch("/api/alumnos").then((response) => response.json()),
        ]).then(([ alumnosData]) => {
            setAlumnos(alumnosData);
        }).catch((error) => {
            toast("Error al obtener los datos");
        });
    }, [])

    const router = useRouter()

    const onSubmitCreateProyectForm = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);


        const payload = {
            nombre: data.get('nombre'),
            modulo: data.get('modulo'),
            correos: [data.get('correo1'), data.get('correo2')]
        }


        if (!nombre) {
            toast.error('Debes ingresar el nombre del módulo');
            return;
        }

        if (!modulo) {
            toast.error('Debes seleccionar un módulo');
            return;
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

    return <Layout title='Nuevo Proyecto' user={user} >
        <Card>
            <form onSubmit={onSubmitCreateProyectForm} className="flex flex-col w-[400px]">
                <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Nombre del módulo</span>
                <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Arquitectura y programación de sistemas" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Modulo</span>

                <select name="modulo" className="bg-white border px-2 rounded-lg h-10" value={modulo} onChange={(event) => setModulo(event.target.value)}>
                    <option value="opcion">Selecciona un módulo</option>
                    <option value="Modulo_1">Módulo_1</option>
                    <option value="Modulo_2">Módulo_2</option>
                    <option value="Modulo_3">Módulo_3</option>
                </select>
                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Integrantes:
                </p>
                <select id="alumn-select" name="correo1" className="bg-white border px-2 rounded-lg h-10" value={select1}

                    onChange={(event) => setSelect1(event.target.value)}>
                    <option value="opcion">Selecciona una integrante</option>
                    {alumnos.filter(alumno => alumno.correo != select2).map((alumno) => (
                        <option key={alumno.id} value={alumno.correo}>
                            {alumno.correo}
                        </option>
                    ))}
                </select>

                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">

                </p>
                <select id="alumn-select" name="correo2" className="bg-white border px-2 rounded-lg h-10" value={select2}
                    onChange={(event) => setSelect2(event.target.value)}>
                    <option value="opcion">Selecciona una integrante</option>
                    {alumnos.filter(alumno => alumno.correo != select1).map((alumno) => (
                        <option key={alumno.id} value={alumno.correo}>
                            {alumno.correo}
                        </option>
                    ))}
                </select>
                {/* <div class="flex flex-wrap justify-center mt-5 py-3 border-t border-t-slate-900">
                </div> */}
                <button type="submit" className="mt-5 bg-blue-900 font-bold text-white h-10 rounded-lg">Crear</button>
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

export default NuevoProyecto;