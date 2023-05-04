import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from "react";
import Layout from "../../../../../../components/layouts/MainLayout";
import Card from "../../../../../../components/Card";
import { privatePage } from "../../../../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoceEtapa2 = ({ user }) => {

    const payload = {
        "media": {
            "ext": "pdf",
            "b64": ""
        },
        "description": ""
    };

    const onSubmitDocumentForm = useCallback(async () => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);

        try {
            const response = await fetch(`/api/documents/${documentId}/observaciones`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                console.log(response);
                throw new Error()
            }
            toast("Evaluación exitosa")

        } catch (error) {
            toast.error("Error al registrar observacion")

        }
    }, [])

    return <Layout title='Etapa 3 - Informe Final' user={user} >
        <Card>
            <form className="flex flex-col">
                <div class="flex w-full h-screen items-center justify-center bg-grey-lighter">
                    <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-700 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                            <path d="M251 896q-88 0-149.5-61.5T40 685q0-79 50.5-137.5T217 477q15-84 82-148.5T451 264q24 0 42 13.5t18 36.5v294l83-83 43 43-156 156-156-156 43-43 83 83V319q-86 11-135 75.5T267 534h-19q-61 0-104.5 43T100 685q0 65 45 108t106 43h500q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-68-33-117.5T570 338v-65q81 29 129.5 101T748 534v24q72-2 122 46t50 123q0 69-50 119t-119 50H251Zm229-347Z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Descargar PDF</span>
                        <input type='file' class="hidden" />
                    </label>
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