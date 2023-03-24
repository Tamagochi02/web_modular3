import Link from "next/link";
import { useState } from "react";
import { privatePage } from "../lib/ironSessionConfig";
import { useRouter } from 'next/router'

const LogIn = () => {
  //useState retorna dos variables dentro de un arreglo
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const router = useRouter()
  const onChange = ({ currentTarget }) => setContrasenia(currentTarget.value);

  const onSubmitLoginForm = (eventForm) => {
    // Funcion para la accion del boton
    eventForm.preventDefault(); // evitar que refresh en la pagina al darle click al boton y no se pierden la coockies ni el inicio de sesión

    const payload = {
      correo: usuario + "@universidad-une.com",
      contrasena: contrasenia,
    };

    // FETCH: proporciona una interfaz JavaScript para acceder y 
    // manipular partes del canal HTTP, tales como peticiones y respuestas.
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        response.json()
        if (response.ok) {
          router.reload() // Recargar la pagina al iniciar sesion
        }
      })
      .catch((error) => console.log(error))
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-grow">
        <aside className="justify-evenly bg-gray-800 font-serif">
          <div className="flex flex-col items-center">
            <div className="flex mr-3 text-4xl pt-24 text-center text-white flex-col">
              <p> ¡Bienvenido! </p>
              <span className="justify-center material-icons text-9xl">
                account_circle
              </span>
            </div>

            <form onSubmit={onSubmitLoginForm} className="pt-20 pl-12 pr-7">
              <p className=" text-xl pt-5 text-white">
                {""}
                Correo institucional:{""}
              </p>
              <p className="">
                <input
                  type="text"
                  value={usuario}
                  onChange={(eventInput) => setUsuario(eventInput.target.value)}
                  placeholder="Matrícula"
                ></input>{" "}
                <span className=" text-white">
                  {" "}
                  @universidad-une.com{" "}
                </span>
              </p>
              {/* <p className=" text-xl text-black ">
                Escribe el nombre del proyecto:
                <input
                  type="text"
                  className="text-black outline-double outline-3 w-full" placeholder="Gestor de Proyectos Modulares ..."
                ></input>
              </p> */}

              <p className=" text-xl pt-5 text-white">
                {""}
                Contraseña:{""}
              </p>

              <p>
                <input
                  type="password"
                  className="w-80"
                  value={contrasenia}
                  onChange={(eventInput) =>
                    setContrasenia(eventInput.target.value)
                  } placeholder="******"
                ></input>{" "}
                <button className="material-icons text-white" onClick={() => setShowPassword(!showPassword)}>
                  {!showPassword ? <span className="material-icons-outlined md-light text-white text-3xl">
                    visibility
                  </span> : <span className="material-icons md-light md-inactive text-white text-3xl">
                    visibility_off
                  </span>}
                </button>
              </p>

              <div className=" flex pt-7 pl-24">
                <button className=" rounded w-36 h-14 transition bg-white hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 duration-150">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </aside>
        <header>
          {/* <div>
            <p id="contenedorDerecho" className="w-full flex flex-col">
              <div className=" m-auto text-center pt-52">
                <span className="material-icons-outlined text-9xl">book</span>
                <p className=" text-xl text-center">
                  {" "}
                  Gestor de proyectos <br /> modulares{" "}
                </p>
              </div>
            </p>
          </div> */}
        </header>
      </div>
    </div>
  );
};

// rutas protegidas
export const getServerSideProps = privatePage((context) => {
  const user = context.req.session.user; //si hay un usuario
  if (user) {
    switch (context.req.session.role) {
      case "alumno":
        return {
          redirect: {
            destination: "/dashboard_d",//cambiar
            permanent: false,
          },
        };
      case "docente":
        return {
          redirect: {
            destination: "/dashboard_d",
            permanent: false,
          },
        };
      case "admin":
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
        };
    }
  }
  return {
    props: {},
  };
});
export default LogIn;
