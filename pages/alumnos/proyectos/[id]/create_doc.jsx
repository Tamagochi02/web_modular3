import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Layout from "../../../../components/layouts/MainLayout";
import Card from "../../../../components/Card";
import { privatePage } from "../../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateDoc = ({ user }) => {
    const router = useRouter()
    const { id: proyectId } = router.query

    const onSubmitCreateDoceEtapa1Form = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);

        const payload = {
            nombre: data.get('nombre'),
            titulo: data.get('titulo'),
            etapa: data.get('etapa'),
        }

        fetch(`/api/projects/${proyectId}/documents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    toast("Registro exitoso")
                    setTimeout(() => {
                        router.push(`/alumnos/proyectos/${proyectId}`);
                    }, 3000);
                } else {
                    toast("Error al crear el documento")
                }
            })
            .catch((error) => {
                toast.error("Error al crear el documento");
            });


    }


    return <Layout title='Documento' user={user} >
        <Card>
            <form onSubmit={onSubmitCreateDoceEtapa1Form} className="flex flex-col w-[400px]">

                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Nombre:
                </p>
                <input name="nombre" type="text" className="border px-2 rounded-lg h-10" placeholder="Nombre del documento" />
                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Título:
                </p>
                <input name="titulo" type="text" className="border px-2 rounded-lg h-10" placeholder="Título del documento" />
                <div className='flex flex-col'>
                    <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                        Etapa:
                    </p>
                    <select name="etapa" className="bg-white border px-2 rounded-lg h-10">
                        <option value="opcion">Selecciona una etapa</option>
                        <option defaultValue value="etapa_1">Etapa 1</option>
                        <option value="etapa_2">Etapa 2</option>
                        <option value="etapa_3">Etapa 3</option>
                    </select>
                </div>

                {/* <button type="submit" className="mt-5 bg-blue-500 text-white h-10 rounded-lg">Crear</button> */}
                <button type="submit" className="mt-5 bg-blue-900 font-bold text-white h-10 rounded-lg">Crear</button>
                <ToastContainer />
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

export default CreateDoc;