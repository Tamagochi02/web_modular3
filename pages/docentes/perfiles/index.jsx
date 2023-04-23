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
                <div class="flex flex-col justify-center items-center">

                    <span class="material-icons text-9xl text-gray-800 ">
                        account_circle
                    </span>
                    <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">{user.nombre}</h3>
                    <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{user.rol}</span>
                </div>
                {/* <div class="mt-6 py-6 border-t border-slate-200 text-center"> */}
                <div class="flex flex-wrap justify-center mt-6 py-6 border-t border-slate-200">
                    <form className="flex flex-col w-[400px]">

                        <span className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Correo electrónico:</span>
                        <input name="nombre" type="text" className="border px-2 rounded-lg h-10" value={user.correo} readOnly />
                        <span className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Estatus</span>
                        <input name="nombre" type="text" className="border px-2 rounded-lg h-10" value={user.estaActivo ? "Activo" : "No activo"} readOnly />
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