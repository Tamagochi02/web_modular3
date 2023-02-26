import { withIronSessionApiRoute,withIronSessionSsr } from "iron-session/next";

export const ironOptions = {
    cookieName: "gestor_modular_session",
    password: process.env.IRON_SESSION_COOKIE_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite:"strict"
    },
  };
  //console.log(process.env.IRON_SESSION_COOKIE_PASSWORD)

  // Funcion para validar el acceso a rutas:
  export const privateRoute = (handler) => withIronSessionApiRoute((req, res)=>{
    
    if(!req.session.user){ // Valida si existe una sesion de alumno, si no es asi, no autoriza acceso
      return res.status(401).json({error:'No autorizado'})
    }

    return handler(req, res) // Devuelve handler con acceso a cookie
  }, ironOptions)

  export const privatePage = (handler) => withIronSessionSsr(handler, ironOptions)