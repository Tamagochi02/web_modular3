import Link from "next/link";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const Registros = ({ user }) => {

    return <Layout title='Registros' user={user} >
        <Card>
            <div className="grid grid-cols-10 gap-5 auto-rows-auto">
                <Link
                    href={"/administradores/busquedas/tabla_alumnos"}
                    className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
                >
                    {/* <span className="text-gray-300 text-5xl">
                        Usuarios
                        
                    </span> */}

                </Link>
                {

                }
            </div>
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

export default Registros;