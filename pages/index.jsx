import { Rol } from "@prisma/client";
import { useRouter } from 'next/router'
import { privatePage } from "../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ user }) => {
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
        else toast("Error en usuario o contraseña")
      })
      .catch((error) => toast("Error en usuario o contraseña"))
  }

  return (
    <div className="flex w-screen h-screen font-mono">
      <div className="flex-1 bg-blue-900 grid place-content-center">
        <form onSubmit={onSubmitLoginForm} className="flex flex-col w-[400px] text-white">
          <h1 className="text-4xl font-bold mb-5 text-center uppercase">Gestor Modular</h1>
          <span>Correo:</span>
          <div>
            <input name="correo" type="text" className="bg-blue-500 border border-white px-2 rounded-lg h-10" />
            <span className="pl-1 font-semibold">@universidad-une.com</span>
          </div>
          <span>Contraseña:</span>
          <input name="contraseña" type="password" className="bg-blue-500 border border-white px-2 rounded-lg h-10" />
          <button type="submit" className="mt-5 text-blue-600 bg-white h-10 rounded-lg font-bold">Ingresar</button>
          <ToastContainer />
        </form>

        <p className="mt-5 text-center block mb-2 text-sm font-medium text-white dark:text-white uppercase">¿No tienes
          una cuenta?
          Registrate<a class="text-red-500 hover:underline"
            href="/usuarios/registros"> ¡Aquí!</a>.
        </p>
      </div>
      <div className="flex-1 grid place-content-center">
        <img src="organize blue-resume.svg" alt="organize" />
        {/* <img src="FoxH3B.png" alt="organize" /> */}
      </div>
    </div>
  );
};

// rutas protegidas
export const getServerSideProps = privatePage((context) => {
  const user = context.req.session.user;
  if (!user) return { props: {} }
  // if (!user.estaActivo){
  //   return {
  //     redirect: {
  //       destination: "api/",
  //       permanent: false,
  //     },
  //   };
  // }

  switch (user.rol) {
    case Rol.Alumno:
      return {
        redirect: {
          destination: "/alumnos/dashboard",
          permanent: false,
        }
      };
    case Rol.Docente:
      return {
        redirect: {
          destination: "/docentes/dashboard",
          permanent: false,
        },
      };
    case Rol.Administrador:
      return {
        redirect: {
          destination: "/administradores/dashboard",
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
