import Link from "next/link";
import Layout from "../../../components/layouts/MainLayout";
import { privatePage } from "../../../lib/ironSessionConfig";

const InfoProyecto = ({ user }) => {
    return <Layout title='Proyecto' user={user} >
        <div className="bg-white p-5 rounded-lg">
            <h1>Nombre del proyecto</h1>
            <h2>Etapa</h2>
        </div>

        <div className="bg-white p-5 rounded-lg mt-8">
            <h1>Documentos</h1>
            <div className="grid grid-cols-10 gap-5 auto-rows-auto">
                <Link
                    href={"#"}
                    className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
                >
                    <span className="text-gray-300 text-5xl material-icons">
                        add
                    </span>
                </Link>
            </div>
        </div>
    </Layout>
};

export const getServerSideProps = privatePage(async (context) => {
    const user = context.req.session.user;

    // fetch(/turuta/paraobtenerinformaciondeunproyecto/id)

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

export default InfoProyecto;