import { Rol } from '@prisma/client'
import type { NextApiHandler } from 'next'
import { exclude, prisma } from "../../lib/prisma"

export const readAdmin: NextApiHandler = async (_req, res) => {
    const users = await prisma.usuario.findMany({
        where: { rol: Rol.Administrador }
    })
    res.json(users)
}

export const createAdmin: NextApiHandler = async (req, res) => {
    const {
        nombre, correo, contrasena
    } = req.body
    const user = await prisma.usuario.create({
        data: {
            rol: Rol.Administrador,
            nombre, correo, contrasena
        }
    })
    res.json(user)
}

export const updateAdmin: NextApiHandler = async (req, res) => {
    const {
        nombre, correo, contrasena, estaActivo, id, adminId
    } = req.body
    const user = await prisma.usuario.update({
        data: {
            nombre, correo, contrasena, estaActivo
        },
        where: {
            id
        }
    })
    res.json(exclude(user, ['contrasena']))
}
