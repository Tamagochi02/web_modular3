import Layout from "../../../components/layouts/MainLayout";
import { privatePage } from "../../../lib/ironSessionConfig";

const NuevoProyecto = ({ user }) => {

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
            .then((response) => response.json())
            .then(console.log)
            .catch((error) => console.log(error))
    }

    return <Layout title='Nuevo Proyecto' user={user} >
        <div className="bg-white p-5 rounded-lg">
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
        </div>
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