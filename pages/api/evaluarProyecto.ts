import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma} from "../../lib/prisma";


const updateProyectDocente: IronNextApiHandler = async (req, res) => {
    const { estado, evaluacion, id } = req.body
    const proyecto = await prisma.proyecto.update({
        data: {
            estado, evaluacion
        },
        where: {
            id
        }
    })
    res.json(proyecto)
}

export default withIronSessionApiRoute(updateProyectDocente, ironOptions)