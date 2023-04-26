import { Rol } from "@prisma/client";
import Layout from "../../components/layouts/MainLayout.jsx";
import { privatePage } from "../../lib/ironSessionConfig";

const Dashboard = ({ user }) => {
  return <Layout title='Alumno' user={user} >
<div class="flex h-screen w-full items-center justify-center text-center bg-white bg-[url('/FoxH3A.png')] bg-center bg-no-repeat">

</div>
  </Layout>
};

export const getServerSideProps = privatePage(async (context) => {
  const user = context.req.session.user;
  if (!user || user.rol != Rol.Alumno) {
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