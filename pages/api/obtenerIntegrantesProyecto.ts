import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";
import { Rol } from "@prisma/client";

const readUsersById: IronNextApiHandler = async (req, res) => {
    const { userId } = req.body
    const usuarios = await prisma.usuario.findFirst({
        where: {
            id: userId,
            rol: Rol.Alumno
        }
    })
    res.json(usuarios);
}

export default withIronSessionApiRoute(readUsersById, ironOptions)