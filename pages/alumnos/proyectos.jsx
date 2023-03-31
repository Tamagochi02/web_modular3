import Layout from "../../components/layouts/MainLayout";
import { privatePage } from "../../lib/ironSessionConfig";

const Proyectos = ({ user }) => {
    return <Layout title='Proyectos' user={user} >

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

export default Proyectos;