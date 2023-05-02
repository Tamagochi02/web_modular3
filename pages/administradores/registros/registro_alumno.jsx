import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistroAlumno = ({ user }) => {
    const router = useRouter()

    const onSubmitLRegisterForm = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);

        const payload = {
            matricula: data.get('matricula'),
            correo: data.get('correo'),
            nombre: `${data.get('nombre')} ${data.get('paterno')} ${data.get('materno')}`,
            contrasena: data.get('contrasena')


        }

        fetch("/api/alumnos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) router.reload(toast("Registro exitoso"))
                else toast("Error al registrar al alumno")
            })
            .catch((error) => toast("Error al registrar al alumno"))
    }

    return <Layout title='Registro Alumno' user={user} >
        <div className="relative max-w-md mx-auto mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl py-5 px-5">
            <div className="px-6">
                <form onSubmit={onSubmitLRegisterForm} className="flex flex-col">
                    <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                        Matrícula:
                    </p>
                    <input name="matricula" type="text" className="border px-2 rounded-lg h-10" placeholder="Matrícula del alumno" />

                    <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                        Correo institucional:
                    </p>
                    <input name="correo" type="text" className="border px-2 rounded-lg h-10" placeholder="correoalumno@universidad-une.com" />

                    <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                        Nombre:
                    </p>
                    <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Nombre del alumno" />

                    <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                        Apellido Paterno:
                    </p>
                    <input name="paterno" type="text" className="border px-2 rounded-lg h-10" placeholder="Primer Apellido del alumno" />

                    <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                        Apellido Materno:
                    </p>
                    <input name="materno" type="text" className="border px-2 rounded-lg h-10" placeholder="Segundo Apellido del alumno" />

                    <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                        Contraseña:
                    </p>
                    <input name="contrasena" type="text" className="border px-2 rounded-lg h-10" placeholder="Escribe la contraseña del alumno" />

                    <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                        Vuelve a escribir la Contraseña:
                    </p>
                    <input name="recontrasena" type="password" className="border px-2 rounded-lg h-10" placeholder="Escribe de nuevo la contraseña" />

                    <div dir="rtl">
                        <div class="relative h-32 w-32">
                            <button type="submit" className="mt-5 bg-blue-700 text-white rounded-lg absolute inset-x-0 top-0 h-10 items-end font-bold">Registrar</button>
                            <ToastContainer />
                        </div>
                    </div>
                </form>
            </div>
        </div>


        <footer class="relative pt-6 pb-2 mt-6">
            <div class="container mx-auto px-4">
                <div class="flex flex-wrap items-center md:justify-between justify-center">
                    <div class="w-full md:w-6/12 px-4 mx-auto text-center">

                    </div>
                </div>
            </div>
        </footer>
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

export default RegistroAlumno;