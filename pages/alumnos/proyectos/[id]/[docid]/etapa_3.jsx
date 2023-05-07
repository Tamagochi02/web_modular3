import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Layout from '../../../../../components/layouts/MainLayout';
import Card from '../../../../../components/Card';
import { privatePage } from '../../../../../lib/ironSessionConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoceEtapa2 = ({ user }) => {
    const router = useRouter();
    const { docid: documentId } = router.query;
    const [proyects, setProyects] = useState([]);

    const payload = {
        media: {
            ext: 'pdf',
            b64: '',
        },
        description: '',
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileSelected = async (event) => {
        const file = event.currentTarget.files[0];
        if (!file) {
            toast.error('Error al cargar archivo');
            return;
        }

        try {
            const fileb64 = await convertBase64(file);
            payload.media.b64 = fileb64.split(',')[1];

            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Error al cargar archivo');
            }

            toast.success('Archivo cargado');

            const responseData = await response.json();

            const response1 = await fetch(`api/documents/${documentId}/etapa3`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: responseData.media }),
            });

            if (!response1.ok) {
                throw new Error('Error al actualizar la etapa 3');
            }

            toast.success('Etapa 3 actualizada');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Layout title='Etapa 3 - Informe Final' user={user}>
            <Card>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const input = document.getElementById('file_input');
                        handleFileSelected({ currentTarget: input });
                    }}
                    className='flex flex-col'
                >
                    <div className='max-w-2xl mx-auto'>
                        <label
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-black uppercase'
                            htmlFor='file_input'
                        >
                            Documento:
                        </label>
                        <input
                            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                            id='file_input'
                            type='file'
                            accept='application/pdf'
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file && file.type !== 'application/pdf') {
                                    alert('Solo se permiten archivos PDF.');
                                    e.target.value = '';
                                }
                            }}
                        ></input>

                        <p className='mt-5 text-center block mb-2 text-sm font-medium text-gray-900 dark:text-black uppercase'>
                            Sube tu Informe Final en formato
                            <a className='text-red-700' target='_blank'>
                                {' '}
                                pdf
                            </a>
                            .
                        </p>
                    </div>
                    <div dir='rtl'>
                        <div className='relative h-32 w-32'>
                            <button
                                type='submit'
                                className='mt-5 bg-blue-900 text-white rounded-lg absolute inset-x-0 top-0 h-11 font-bold'
                            >
                                Subir
                            </button>
                        </div>
                    </div>
                </form>
            </Card>
            <ToastContainer />
        </Layout>
    );
};

export const getServerSideProps = privatePage(async (context) => {
    const user = context.req.session.user;
    if (!user) {
        return {
            redirect: {
                destination: '/api/logout',
                permanent: false,
            },
        };
    }

    return { props: { user } };
});

export default DoceEtapa2;
