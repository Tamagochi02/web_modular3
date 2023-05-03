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
    res.json(usuariosProyecto);
}

export default withIronSessionApiRoute(readUsersByProjectId, ironOptions)