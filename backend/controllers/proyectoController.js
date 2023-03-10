import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener proyectos:
export const get = async (req, res) => {
    const proyectos = await prisma.Usuario.findMany()
    res.json(proyectos)
}

// Crear un proyecto:
export const post = async (req, res) => {
    const {
        nombre, modulo
    } = req.body

    const proyecto = await prisma.Proyecto.create({
        data: {
            nombre, modulo
        }
    })

    res.json(proyecto)
}

// Actualizar un proyecto
export const put = async (req, res) => {
    const {
        nombre, modulo, estado, evaluacion, id
    } = req.body

    const proyecto = await prisma.Proyecto.update({
        data: {
            nombre, modulo, estado, evaluacion
        }, 
        where: {
            id
        }
    })

    res.json(proyecto)
}