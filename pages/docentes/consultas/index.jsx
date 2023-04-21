import Link from "next/link";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const Consultas = ({ user }) => {

    return <Layout title='Consultas' user={user} >
        <Card>
            <div className="grid grid-cols-10 gap-5 auto-rows-auto">
                <span className="text-gray-300 text-5xl material-icons">
                    add
                </span>
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

export default Consultas;