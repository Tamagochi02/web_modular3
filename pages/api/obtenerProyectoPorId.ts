import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";

const readProyectById: IronNextApiHandler = async (req, res) => {
    const {id} = req.body
    const proyecto = await prisma.proyecto.findFirst({
        where: {
            id: id
            }
        }
    )
    res.json(proyecto);
}

export default withIronSessionApiRoute(readProyectById, ironOptions)