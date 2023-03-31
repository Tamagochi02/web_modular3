import { Rol } from '@prisma/client'
import type { NextApiHandler } from 'next'
import { prisma } from "../../lib/prisma"

export const readAlumnos: NextApiHandler = async (_req, res) => {
    const users = await prisma.usuario.findMany({
        where: { rol: Rol.Alumno }
    })
    res.json(users)
}

export const createAlumno: NextApiHandler = async (req, res) => {
    const {
        nombre, correo, contrasena, matricula
    } = req.body
    const user = await prisma.usuario.create({
        data: {
            rol: Rol.Alumno,
            nombre, correo, contrasena,
        }
    })
    const matriculaCreated = await prisma.matricula.create({
        data: {
            matricula,
            usuario: {
                connect: {
                    id: user.id
                }
            }
        }
    })
    const userWithMatricula = await prisma.usuario.findUnique({
        where: {
            id: user.id
        },
        include: {
            Matricula: true
        }
    })
    res.json(userWithMatricula)
}

export const updateAlumno: NextApiHandler = async (req, res) => {
    const {
        nombre, correo, contrasena, matricula,
        foto, estaActivo, ActualizadoEn, id, proyectoAlumnoId, docenteId
    } = req.body
    const user = await prisma.usuario.update({
        data: {
            nombre, correo, contrasena, foto, Matricula: matricula, estaActivo, ActualizadoEn,
            proyectoAlumnos: {
                connect: {
                    id: proyectoAlumnoId
                }
            },
            proyectoDocente: {
                connect: {
                    id: docenteId
                }
            }
        },
        where: {
            id
        }
    })
    res.json(user)
}
