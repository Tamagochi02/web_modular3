import Link from "next/link";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const Registros = ({ user }) => {

    return <Layout title='Registros' user={user} >

        <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl py-5 px-5">
            <div className="grid grid-cols-3 gap-5 auto-rows-auto">
                <Link
                    href={"/administradores/registros/registro_alumno"}
                    className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
                >
                    <span className=" text-5xl text-center cursor-pointer">
                        Alumno
                        <label className="material-icons text-9xl text-blue-700 items-center cursor-pointer">
                            backpack
                        </label>
                    </span>
                </Link>

                <Link
                    href={"/administradores/registros/registro_docente"}
                    className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
                >
                    <span className=" text-5xl text-center cursor-pointer">
                        Docente
                        <label className="material-icons text-9xl text-purple-700 items-center cursor-pointer">
                            history_edu
                        </label>
                    </span>
                </Link>

                <Link
                    href={"/administradores/registros/registro_admin"}
                    className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
                >
                    <span className=" text-5xl text-center cursor-pointer">
                        Admin
                        <label className="material-icons text-9xl text-green-700 items-center cursor-pointer">
                        person_4
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

export default Registros;