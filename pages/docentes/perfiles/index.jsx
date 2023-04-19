import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const PerfileCard = ({ user, children }) => {
    const [alumnos, setAlumnos] = useState([])

    useEffect(() => {
        fetch("/api/alumnos")
            .then((response) => response.json())
            .then(setAlumnos)
            .catch((error) => console.log(error))
    }, [])


    return <Layout title='Perfil' user={user} >
        <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl px-5">
            <div class="px-6">
                <div class="flex flex-wrap justify-center">
                    <div class="w-full flex justify-center">
                        <div class="relative">
                            {/* foto del alumno */}
                            {/* <img src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true" class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" /> */}
                        </div>
                    </div>
                    <div class="w-full text-center mt-20">
                        <div class="flex justify-center lg:pt-4 pt-8 pb-0">
                            <div class="p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{alumnos.rol}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-2">
                    <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">{user.nombre}</h3>
                    <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                        <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Matrícula: {user.matricula}
                    </div>
                </div>
                {/* <div class="mt-6 py-6 border-t border-slate-200 text-center"> */}
                    <div class="flex flex-wrap justify-center mt-6 py-6 border-t border-slate-200">
                        <form className="flex flex-col w-[400px]">

                            <span>Nombre:</span>
                            <input name="nombre" type="text" className="border px-2 rounded-lg h-10" value={user.nombre} readOnly />
                            <span>Correo electrónico:</span>
                            <input name="nombre" type="text" className="border px-2 rounded-lg h-10" value={user.correo} readOnly/>
                            <span>Rol</span>
                            <input name="nombre" type="text" className="border px-2 rounded-lg h-10" value={user.rol} readOnly />
                            <span>Contraseña</span>
                            <input name="nombre" type="password" className="border px-2 rounded-lg h-10" value={user.contrasena} readOnly />
                            {/* <button type="submit" className="mt-5 bg-blue-800 text-white h-10 rounded-lg">Guardar</button> */}
                        </form>
                    </div>
                {/* </div> */}

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

export default PerfileCard;