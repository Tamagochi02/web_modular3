import Link from "next/link";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const Perfiles = ({ user, children }) => {


    return <Layout title='Perfil' user={user} >
        <Card>
            <div className="flex">
                <label htmlFor="image-file">
                    <p className="items-center flex flex-col">
                        <span class="material-icons text-9xl mt-10">
                            account_box
                        </span>
                        Subir imagen
                    </p>
                    <input className="hidden" type="file" name="image-file" id="image-file" />
                </label>
                <form className="flex flex-col w-[400px]">

                    <span>Nombre:</span>
                    <input name="nombre" type="text" className="border px-2 rounded-lg h-10" readOnly />
                    <span>Correo:</span>
                    <input name="nombre" type="text" className="border px-2 rounded-lg h-10" readOnly />
                    <span>Rol</span>
                    <input name="nombre" type="text" className="border px-2 rounded-lg h-10" readOnly />
                    <span>Contraseña</span>
                    <input name="nombre" type="password" className="border px-2 rounded-lg h-10" readOnly />
                    <button type="submit" className="mt-5 bg-blue-800 text-white h-10 rounded-lg">Guardar</button>
                </form>


                {/* <div className="bg-gray-100 flex flex-col w-full h-screen">
                    hola
                    <div className="flex-grow px-8 py-4 overflow-auto">
                        {children}
                    </div>
                </div> */}
            </div>

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

export default Perfiles;