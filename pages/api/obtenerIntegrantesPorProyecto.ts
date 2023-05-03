import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";
import { Rol } from "@prisma/client";

const readUsersByProjectId: IronNextApiHandler = async (req, res) => {
    const { proyectoId } = req.body
    const usuariosProyecto  = await prisma.proyectosUsuarios.findMany({
        where: {
            proyectoId: proyectoId,
            usuario: {
                rol: Rol.Alumno
            }
        }
    })
    const usuarios = await Promise.all(usuariosProyecto.map(async (usuarioProyecto) => {
        const usuario = await prisma.usuario.findUnique({
          where: { id: usuarioProyecto.usuarioId }
        })
        return { usuarioProyecto, usuario: usuario }
      }))
    res.json(usuarios);
}

export default withIronSessionApiRoute(readUsersByProjectId, ironOptions)