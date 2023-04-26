import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Layout from "../../../../../../components/layouts/MainLayout";
import Card from "../../../../../../components/Card";
import { privatePage } from "../../../../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoceEtapa2 = ({ user }) => {
    const [proyects, setProyects] = useState([]);

    useEffect(() => {
        fetch('/api/projects')
            .then((response) => response.json())
            .then(setProyects)
            .catch((error) => toast('Error al crear el proyecto'));
    }, []);

    const router = useRouter();

    const onSubmitCreateProyectForm = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);

        const payload = {
            descripcion: data.get('descripcion'),
            objGeneral: data.get('objGeneral'),
            objsMetas: data.get('objsMetas'),
            alcance: data.get('alcance'),
            herramientas: data.get('herramientas'),
            pdf: data.get('pdf'),
        };

        fetch('/api/projects/documents', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => router.push('/administradores/busquedas/proyectos/'))
            .catch((error) => console.log(error));
    };

    const onFileChange = (event) => {
        const arr = [];
        if (arr.length > 0) {
            const firstItem = arr[0];
            const file = event.target.files[0];
            if (file && file.type === 'application/pdf') {
                const data = new FormData();
                data.append('pdf', file);
                //evaluar
                fetch('/api/upload/pdf', {
                    method: 'POST',
                    body: data,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        document.getElementById('pdf').value = data.filename;
                    })
                    .catch((error) => console.log(error));
            } else {
                toast('Por favor seleccione un archivo PDF');
            }
        } else {
            toast('Por favor seleccione un archivo PDF');
        }
    };

    return <Layout title='Etapa 3 - Informe Final' user={user} >
        <Card>
            <form onSubmit={onFileChange} className="flex flex-col">
                <div class="max-w-2xl mx-auto">

                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black uppercase" for="file_input">Documento:</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.type !== "application/pdf") {
                                alert("Solo se permiten archivos PDF.");
                                e.target.value = "";
                            }
                        }}
                    ></input>

                    <p class="mt-5 text-center block mb-2 text-sm font-medium text-gray-900 dark:text-black uppercase">Sube tu Informe
                        Final en
                        formato<a class="text-red-700 "
                            target="_blank"> pdf</a>.
                    </p>

                    {/* <p class="mt-5 text-center block mb-2 text-sm font-medium text-gray-900 dark:text-black uppercase">Sube tu Informe
                        Final en
                        formato<a class="text-red-700 hover:underline"
                            href="#" target="_blank"> pdf</a>.
                    </p> */}
                    
                </div>

                {/* <button type="submit" className="mt-5 bg-blue-500 text-white h-10 rounded-lg">Crear</button> */}
                <div dir="rtl">
                    <div class="relative h-32 w-32">
                        <button type="submit" className="mt-5 bg-blue-900 text-white rounded-lg absolute inset-x-0 top-0 h-11 font-bold">Subir</button>
                    </div>
                </div>
            </form>
        </Card>
    </Layout>
};

export const getServerSideProps = privatePage(async (context) => {
    const user = context.req.session.user;
    if (!user) {
        return {
            redirect: {
                destination: "/api/logout",
                permanent: false,
            },
        };
    }

    return { props: { user } }
});

export default DoceEtapa2;