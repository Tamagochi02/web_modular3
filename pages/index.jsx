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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-grow justify-center bg-[url('/gdl.jpg')] bg-cover bg-center bg-fixed" > {/* h-14 bg-gradient-to-r from-blue-300 to-blue-400 */}
        <header>
          <div className="flex items-center justify-center font-serif text-left text-xl bg-white">
            <aside className="justify-center bg-gray-800 font-serif">
              <div className="flex justify-center bg-gray-800 rounded shadow-xl">
                <div className="flex flex-col gap-5 p-6 md:p-10 text-center md:text-left">
                  <div className="flex mr-3 text-4xl pt-24 text-center text-white flex-col">
                    <p> ¡Bienvenido! </p>
                    <span className="justify-center material-icons text-9xl">
                      account_circle
                    </span>
                  </div>
                  <form onSubmit={onSubmitLoginForm} className="pt-20 pl-12 pr-7">
                    <p className=" text-xl justify-center text-white">
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

                    <p className=" text-xl pt-5 text-white">
                      {""}
                      Contraseña:{""}
                    </p>

                    <p>
                      <input
                        type={showPassword ? "text" : "password"}
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

                    <div className=" flex justify-center pt-5">
                      <button className=" rounded w-36 h-14 transition bg-white hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 duration-150">
                        Ingresar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </aside>
          </div>
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
            destination: "/dashboard",//cambiar
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
