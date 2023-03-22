import Layout from "../components/Layout";
import { privatePage } from "../lib/ironSessionConfig";

const Dashboard = ({ alumno, nombre, isEnable, codigo, matricula }) => {
  return < Layout alumno={alumno} nombre={nombre} matricula={matricula} estado={isEnable ? "activo" : "inactivo"} codigo={codigo} >

  </Layout>
};

// rutas protegidas
export const getServerSideProps = privatePage(async (context) => {
  const user = context.req.session.user; //si no hay un usuario
  if (!user) {
    return {
      redirect: {
        destination: "/api/logout",
        permanent: false,
      },
    };
  }

  try {
    const api = process.env.VERCEL_URL // Valida y obtiene la url de Vercel
      ? 'https://' + process.env.VERCEL_URL
      : 'http://localhost:3000'

    var url = `${api}/api/getalumnobyid?matricula=${user.matricula}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseJson = await response.json()
    const { alumno } = responseJson
    return {
      props: {
        ...user,
        alumno
      },
    };
  } catch (error) {
    console.log('err >>>');
    console.log(error);
    return {
      props: {
        ...user
      },
    };
  }
});

export default Dashboard;