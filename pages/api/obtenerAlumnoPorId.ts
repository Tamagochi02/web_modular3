import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";

const readAlumnoById: IronNextApiHandler = async (req, res) => {
    const alumno = await prisma.proyecto.findFirst({
        where: {
            id: req.session.user.id
            }
        }
    )

    const matricula = await prisma.matricula.findFirst({
        where: {
            usuario: {
                id: alumno.id
            }
        }
    })
    res.json(matricula)
}

export default withIronSessionApiRoute(readAlumnoById, ironOptions)