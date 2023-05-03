import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";

const readUsersByProjectId: IronNextApiHandler = async (req, res) => {
    const {proyectoId} = req.body
    const users = await prisma.proyectosUsuarios.findFirst({
        where: {
            proyectoId: proyectoId
            }
        }
    )
    res.json(users);
}

export default withIronSessionApiRoute(readUsersByProjectId, ironOptions)