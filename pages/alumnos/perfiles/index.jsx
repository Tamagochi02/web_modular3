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
        <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl px-5">
            <div className="px-6">
                <div className="flex flex-col justify-center items-center">

                    <span className="material-icons text-9xl text-gray-800 ">
                        account_circle
                    </span>
                    <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{user.nombre}</h3>
                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{user.rol}</span>
                </div>

                <div className="text-center mt-2">
                    <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"> {user.matricula}</i>
                    </div>
                </div>
                {/* <div className="mt-6 py-6 border-t border-slate-200 text-center"> */}
                <div className="flex flex-wrap justify-center mt-6 py-6 border-t border-slate-200">
                    <form className="flex flex-col w-[400px]">

                        <span className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Nombre:</span>
                        <input name="nombre" type="text" className="border px-2 rounded-lg h-10" value={user.nombre} readOnly />
                        <span className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Correo electrónico:</span>
                        <input name="nombre" type="text" className="border px-2 rounded-lg h-10" value={user.correo} readOnly />
                        <span className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Estatus:</span>
                        <input name="nombre" type="text" className="border px-2 rounded-lg h-10" value={user.estaActivo ? "Activo" : "No activo"} readOnly />
                        {/* <button type="submit" className="mt-5 bg-blue-800 text-white h-10 rounded-lg">Guardar</button> */}
                    </form>
                </div>
                {/* </div> */}

            </div>
        </div>


        <footer className="relative pt-6 pb-2 mt-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">

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