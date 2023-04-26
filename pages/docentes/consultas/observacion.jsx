import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Observaciones = ({ user }) => {
    const [proyects, setProyects] = useState([])

    useEffect(() => {
        fetch("/api/obtenerProyectoPorId")
            .then((response) => response.json())
            .then(setProyects)
            .catch((error) => toast("Error al obtener los proyecto"))
    }, [])

    return <Layout title='Observación' user={user} >
        <Card className="p-4">
            <form className="flex flex-col w-[500px]">
                <div className='flex flex-col'>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Nombre:</span>
                    <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Arquitectura y programación de sistemas" readOnly />

                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Modulo</span>
                    <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Arquitectura y programación de sistemas" readOnly />
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Estado:</span>
                    <select name="estado" className="bg-white border px-2 rounded-lg h-10">
                        <option value="opcion">Selecciona el estado</option>
                        <option value="Modulo_1">Entregado</option>
                        <option value="Modulo_2">Debe_modificarse</option>
                        <option value="Modulo_3">Revisado</option>
                        <option value="Modulo_3">Modificado</option>
                    </select>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Evaluación:</span>
                    <select name="evaluacion" className="bg-white border px-2 rounded-lg h-10">
                        <option value="opcion">Evaluación</option>
                        <option value="Modulo_1">Acreditado</option>
                        <option value="Modulo_2">No_acreditado</option>
                        <option value="Modulo_3">Sin_evaluar</option>
                    </select>

                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Observaciones generales</span>
                    <textarea name="observacion" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Un resumen de tu proyecto..." readOnly></textarea>

                </div>
                {/* <button type="submit" className="mt-5 bg-blue-500 text-white h-10 rounded-lg">Crear</button> */}
                <button type="submit" className="mt-5 bg-blue-900 font-bold text-white h-10 rounded-lg">Calificar</button>
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

export default Observaciones;