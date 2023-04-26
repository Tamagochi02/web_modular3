import Link from "next/link";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const Busquedas = ({ user }) => {

    return <Layout title='Busquedas' user={user} >

        <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl py-5 px-5">
            <div className="grid grid-cols-2 gap-5 auto-rows-auto">
            <Link
                    href={"/administradores/busquedas/tabla_usuarios"}
                    className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
                >
                    <span className=" text-5xl text-center cursor-pointer">
                        Usuarios
                        <label className="material-icons text-9xl text-gray-800 items-center cursor-pointer">
                            group
                        </label>
                    </span>
                </Link>

                <Link
                    href={"/administradores/busquedas/tabla_proyectos"}
                    className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
                >
                    <span className=" text-5xl text-center cursor-pointer">
                        Proyectos
                        <label className="material-icons text-9xl text-gray-800 items-center cursor-pointer">
                            description
                        </label>
                    </span>
                </Link>

                {

                }

            </div>
        </div>
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

export default Busquedas;