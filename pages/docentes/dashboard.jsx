import { Rol } from "@prisma/client";
import Layout from "../../components/layouts/MainLayout.jsx";
import { privatePage } from "../../lib/ironSessionConfig";

const Dashboard = ({ user }) => {
  return <Layout title='Docentes' user={user} >

  </Layout>
};

export const getServerSideProps = privatePage(async (context) => {
  const user = context.req.session.user;
  if (!user || user.rol != Rol.Docente) { //Cambiar a Docente
    return {
      redirect: {
        destination: "/api/logout",
        permanent: false,
      },
    };
  }

  return { props: { user } }
});

export default Dashboard;