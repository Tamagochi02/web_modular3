import { prisma } from "../../lib/prisma"
import type { IronNextApiHandler } from "../../lib/ironSessionConfig"

export const readProyects: IronNextApiHandler = async (req, res) => {
    const proyectos = await prisma.proyecto.findMany({
        where: {
            usuarios: {
                some: {
                    usuario: {
                        id: req.session.user.id
                    }
                }
            }
        }
    })
    res.json(proyectos)
}

export const readProyectById: IronNextApiHandler = async (req, res) => {
    const { proyectoid } = req.query;
    const proyectos = await prisma.proyecto.findFirst({
        where: {
            id: proyectoid.toString(),
            usuarios: {
                some: {
                    usuario: {
                        id: req.session.user.id
                    }
                }
            }

        }
    })
    res.json(proyectos)
}

export const createProyect: IronNextApiHandler = async (req, res) => {
    const { nombre, modulo, ids } = req.body
    const proyecto = await prisma.proyecto.create({
        data: { nombre, modulo }
    })
    await prisma.proyectosUsuarios.create({
        data: {
            proyecto: {
                connect: {
                    id: proyecto.id
                }
            },
            usuario: {
                connect: {
                    id: req.session.user.id
                }
            }
        }
    })
    await prisma.proyectosUsuarios.create({
        data: {
            proyecto: {
                connect: {
                    id: proyecto.id
                }
            },
            usuario: {
                connect: {
                    id: ids
                }
            }
        }
    })



    /* for await (const correo of correos) {
        const usuario = await prisma.usuario.findFirst({
            where: {
                correo: correo
            }
        })
        if(usuario) {
            await prisma.proyectosUsuarios.create({
                data: {
                    proyecto: {
                        connect: {
                            id: proyecto.id
                        }
                    },
                    usuario: {
                        connect: {
                            id: usuario.id
                        }
                    }
                }
            })
        }
    } */
    res.json(proyecto)
}

export const updateProyect: IronNextApiHandler = async (req, res) => {
    const { nombre, modulo, estado, evaluacion, id } = req.body
    const proyecto = await prisma.proyecto.update({
        data: {
            nombre, modulo, estado, evaluacion
        },
        where: {
            id
        }
    })
    res.json(proyecto)
}