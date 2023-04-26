import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormDocente = ({ }) => {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onSubmitLRegisterForm = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);
        const form = event.target;

        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }


        const payload = {
            correo: data.get('correo'),
            nombre: `${data.get('nombre')} ${data.get('paterno')} ${data.get('materno')}`,
            contrasena: data.get('contrasena')
        }


        fetch("/api/docentes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Registro exitoso");
                    setTimeout(() => {
                        router.push("/");
                    }, 3000);
                } else {
                    toast.error("Error al registrar al docente");
                }
            })
            .catch((error) => {
                toast.error("Error al registrar al docente");
            });

    }


    return (
        <div class="flex h-screen w-full items-center justify-center bg-white bg-[url('/resume.png')] bg-center bg-contain bg-no-repeat">
            <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <h3 className="uppercase font-bold text-white text-2xl text-center">Registro del Docente</h3>
                <button className="text-white material-icons ml-auto absolute top-0 left-8 h-16 w-16 font-bold" onClick={() => router.push("/usuarios/registros")}>arrow_back_io</button>
                <div className="relative max-w-md mx-auto mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl py-5 px-5">

                    <div className="px-20">
                        <form onSubmit={onSubmitLRegisterForm} className="flex flex-col">
                
                            <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                Correo institucional:
                            </p>
                            <input name="correo" type="text" className="border px-2 rounded-lg h-10" placeholder="correoalumno@universidad-une.com" />

                            <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                Nombre:
                            </p>
                            <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Nombre" />

                            <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                Apellido Paterno:
                            </p>
                            <input name="paterno" type="text" className="border px-2 rounded-lg h-10" placeholder="Primer Apellido" />

                            <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                Apellido Materno:
                            </p>
                            <input name="materno" type="text" className="border px-2 rounded-lg h-10" placeholder=" Segundo Apellido" />

                            <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                Contraseña:
                            </p>
                            <input name="contrasena" type="text" className="border px-2 rounded-lg h-10" placeholder="Escribe la contraseña" value={password}
                                onChange={(e) => setPassword(e.target.value)} />

                            <p className=" text-cnblock uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                Reescribe la Contraseña:
                            </p>
                            <input name="password" type="text" className="border px-2 rounded-lg h-10" placeholder="Escribe de nuevo la contraseña" value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button type="submit" className="mt-5 bg-purple-700 text-white h-10 rounded-lg font-bold">Registrarme</button>
                            <ToastContainer />
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FormDocente;