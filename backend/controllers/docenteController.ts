import { Rol } from '@prisma/client'
import type { NextApiHandler } from 'next'
import { exclude, prisma } from "../../lib/prisma"

export const readDocentes: NextApiHandler = async (_req, res) => {
    const users = await prisma.usuario.findMany({
        where: { rol: Rol.Docente }
    })
    res.json(users)
}

export const createDocente: NextApiHandler = async (req, res) => {
    const {
        nombre, correo, contrasena
    } = req.body
    const user = await prisma.usuario.create({
        data: {
            rol: Rol.Docente,
            nombre, correo, contrasena
        }
    })
    res.json(user)
}

export const updateDocente: NextApiHandler = async (req, res) => {
    const {
        nombre, correo, contrasena,
        foto, estaActivo, id, docenteId
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
