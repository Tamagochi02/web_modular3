import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

const RegistrosLogin = ({ user, children }) => {
    const [alumnos, setAlumnos] = useState([])
    const router = useRouter()
    
    useEffect(() => {
        fetch("/api/alumnos")
            .then((response) => response.json())
            .then(setAlumnos)
            .catch((error) => console.log(error))
    }, [])


    return (
        <div class="flex h-screen w-full items-center justify-center text-center bg-white bg-[url('/resume.png')] bg-center bg-contain bg-no-repeat"
        >
            <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">

                <div class="px-6">
                    <div class="flex flex-col justify-center items-center">
                        <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1"></h3>
                        <span class="text-xl font-bold block uppercase tracking-wide text-slate-700"></span>
                    </div>
                   
                    <div class="flex flex-wrap justify-center mt-6 py-6 border-t border-slate-200">
                    </div>
                    
                    <h3 className="uppercase font-bold text-white text-2xl">Selecciona tu rol</h3>
                    <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl py-5 px-5">
                        <div className="grid grid-cols-2 gap-6 auto-rows-auto">
                            <Link
                                href={"/usuarios/formAlumno"}
                                className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center bg-blue-500"
                            >
                                <span className=" font-bold text-5xl text-center cursor-pointer text-white">
                                    Alumno

                                    <label className="material-icons text-9xl text-white items-center cursor-pointer">
                                        backpack
                                    </label>
                                </span>
                            </Link>

                            <Link
                                href={"/usuarios/formDocente"}
                                className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center bg-purple-500"
                            >
                                <span className=" font-bold text-5xl text-center cursor-pointer text-white">
                                    Docente
                                    <label className="material-icons text-9xl text-white items-center cursor-pointer">
                                        history_edu
                                    </label>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap justify-center mt-20 py-6 border-t border-slate-200"></div>
                <button className="text-white material-icons ml-auto absolute top-0 left-8 h-16 w-16 font-bold" onClick={() => router.push("/")}>arrow_back_io</button>
            </div>
        </div>

    );
};


export default RegistrosLogin;