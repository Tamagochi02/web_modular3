import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma, exclude } from "../../lib/prisma";

const readAlumnoById: IronNextApiHandler = async (req, res) => {
    const alumno = await prisma.proyecto.findFirst({
        where: {
            id: req.session.user.id
            }
        }
    )
    res.json(alumno)
}

export default withIronSessionApiRoute(readAlumnoById, ironOptions)