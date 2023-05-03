import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";
import { Rol } from "@prisma/client";

const readUsersByProjectId: IronNextApiHandler = async (req, res) => {
    const { proyectoId } = req.body
    const usuariosProyecto = await prisma.proyectosUsuarios.findMany({
        where: {
            proyectoId: proyectoId,
            usuario: {
                rol: Rol.Alumno
            }
        }
    })

    for await (const user of usuariosProyecto) {
        const usuario = await prisma.usuario.findFirst({
            where: {
                id: user.usuarioId
            }
        })

        res.json(usuario);
    }
}

export default withIronSessionApiRoute(readUsersByProjectId, ironOptions)