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
                <div className='max-w-2xl mx-auto text-center'>
                    <label
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-black uppercase'
                        htmlFor='file_input'
                    >
                        Documento:
                    </label>

                    <button class="bg-gray-300 hover:bg-gray-500 text-gray-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                        <span className='material-icons'>picture_as_pdf</span>
                        <span className='ml-2'>Descargar</span>
                    </button>

                    <p className='mt-5 text-center block mb-2 text-sm font-medium text-gray-900 dark:text-black uppercase'>
                        Descarga el Informe Final en formato
                        <a className='text-red-700' target='_blank'>
                            {' '}
                            pdf
                        </a>
                        .
                    </p>
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