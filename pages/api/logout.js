import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/ironSessionConfig";

export default withIronSessionApiRoute(
  function logoutRoute(req, res) {
    req.session.destroy(); // Elimina o destruye la sesion activa
    //res.send({ ok: true });
    res.redirect('/') // Para redireccionar la pagina
  }, ironOptions
);