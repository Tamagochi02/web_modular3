import { useRouter } from 'next/router'
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const NuevoProyecto = ({ user }) => {
    const router = useRouter()

    const onSubmitCreateProyectForm = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);

        const payload = {
            nombre: data.get('nombre'),
            modulo: data.get('modulo')
        }

        fetch("/api/proyecto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
            .then(() => router.push('/alumnos/proyectos'))
            .catch((error) => console.log(error))
    }

    return <Layout title='Nuevo Proyecto' user={user} >
        <Card>
            <form onSubmit={onSubmitCreateProyectForm} className="flex flex-col w-[400px]">
                <span>Nombre del proyecto</span>
                <input name="nombre" type="text" className="border px-2 rounded-lg h-10" />
                <span>Modulo</span>
                <select name="modulo" className="bg-white border px-2 rounded-lg h-10">
                    <option value="Modulo_1">Modulo_1</option>
                    <option value="Modulo_2">Modulo_2</option>
                    <option value="Modulo_3">Modulo_3</option>
                </select>
                <button type="submit" className="mt-5 bg-blue-500 text-white h-10 rounded-lg">Crear</button>
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

export default NuevoProyecto;