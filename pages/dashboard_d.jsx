import LayoutD from "../components/LayoutDocente";
import { privatePage } from "../lib/ironSessionConfig";

const MenuD = () => {
  return < LayoutD nombre="Miriam" matricula="A03442" codigo="Y195435">
  </LayoutD>
};

// rutas protegidas
export const getServerSideProps = privatePage((context) => {
  const user = context.req.session.user; //si hay un usuario
  if (!user) {
    return {
      redirect: {
        destination: "/api/logout",
        permanent: false,
      },
    };

  }
  return {
    props: {},
  };
});


export default MenuD;