import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import { privatePage } from "../../../lib/ironSessionConfig";

const Proyectos = ({ user }) => {
    const [proyects, setProyects] = useState([])

    useEffect(() => {
        fetch("/api/proyecto")
            .then((response) => response.json())
            .then(setProyects)
            .catch((error) => console.log(error))
    }, [])

    return <Layout title='Proyectos' user={user} >
        <div className="grid grid-cols-10 gap-5 auto-rows-auto">
            <Link
                href={"/alumnos/proyectos/new"}
                className="aspect-square rounded-md border-2 border-gray-300 grid place-content-center"
            >
                <span className="text-gray-300 text-5xl material-icons">
                    add
                </span>
            </Link>
            {
                proyects.map(proyecto => <Link
                    href={"#"}
                    className="aspect-square rounded-md border-2 border-gray-300"
                >
                    <p>{proyecto.nombre}</p>
                    <p>{proyecto.modulo}</p>
                    <p>{proyecto.estado}</p>
                    <p>{proyecto.evaluacion}</p>
                </Link>)
            }
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

export default Proyectos;