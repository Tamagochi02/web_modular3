import { Rol } from "@prisma/client";
import { useRouter } from 'next/router'
import { privatePage } from "../lib/ironSessionConfig";

const Login = () => {
  const router = useRouter()

  const onSubmitLoginForm = (eventForm) => {
    eventForm.preventDefault();
    const data = new FormData(eventForm.target);

    const payload = {
      correo: `${data.get('correo')}@universidad-une.com`,
      contrasena: data.get('contraseña')
    }

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) router.reload()
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="flex-1 bg-blue-500 grid place-content-center">
        <form onSubmit={onSubmitLoginForm} className="flex flex-col w-[400px] text-white">
          <h1 className="text-4xl font-bold mb-5">Gestor Modulares</h1>
          <span>Correo:</span>
          <div>
            <input name="correo" type="text" className="bg-blue-500 border border-white px-2 rounded-lg h-10" />
            <span className="pl-1 font-semibold">@universidad-une.com</span>
          </div>
          <span>Contraseña:</span>
          <input name="contraseña" type="password" className="bg-blue-500 border border-white px-2 rounded-lg h-10" />
          <button type="submit" className="mt-5 text-blue-500 bg-white h-10 rounded-lg">Ingresar</button>
        </form>
      </div>
      <div className="flex-1 grid place-content-center">
        <img src="organize resume.svg" alt="organize" />
      </div>
    </div>
  );
};

// rutas protegidas
export const getServerSideProps = privatePage((context) => {
  const user = context.req.session.user;
  if (!user) return { props: {} }

  switch (user.rol) {
    case Rol.Alumno:
      return {
        redirect: {
          destination: "/alumnos/dashboard",
          permanent: false,
        },
      };
    case Rol.Docente:
      return {
        redirect: {
          destination: "/dashboard_d",
          permanent: false,
        },
      };
    case Rol.Administrador:
      return {
        redirect: {
          destination: "/dashboard_a",
          permanent: false,
        },
      };
    default:
      return {
        redirect: {
          destination: "/api/logout",
          permanent: false,
        },
      }
  }
})

export default Login;
