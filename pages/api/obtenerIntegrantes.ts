import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";
import { Rol } from "@prisma/client";

const readUsersByProjectId: IronNextApiHandler = async (req, res) => {
    const { proyectoId } = req.body
    const integrantes = await prisma.usuario.findMany({
        where: {
            proyectos: {
                every: {
                    proyectoId: proyectoId
                }
            }
        }
    })
    res.json(integrantes);
}

export default withIronSessionApiRoute(readUsersByProjectId, ironOptions)