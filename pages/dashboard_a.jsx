import LayoutA from "../components/LayoutAdmin";
import { privatePage } from "../lib/ironSessionConfig";

const MenuA = () => {
  return < LayoutA user="Andy02" estado="Activo" codigo="Y19876557">
  </LayoutA>
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

export default MenuA;
