import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma, exclude } from "../../lib/prisma";

const login: IronNextApiHandler = async (req, res) => {
    const { correo, contrasena } = req.body
    if (!correo || !contrasena) return res.status(400).json({ message: 'Falta de datos' })
    const user = await prisma.usuario.findFirst({
        where: {
            AND: [{ correo }, { contrasena }]
        }
    })
    if (!user)
        return res.status(404).json({ message: 'Usuario no encontrado' })
    const secureUser = exclude(user, ['contrasena'])
    req.session.user = secureUser
    await req.session.save()
    res.json(secureUser)
}

export default withIronSessionApiRoute(login, ironOptions)
