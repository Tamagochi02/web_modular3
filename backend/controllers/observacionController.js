import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener todos los observaciones:
export const get = async (req, res) => {
    const observaciones = await prisma.Observacion.findMany({
        where: {
            usuarioID
        }})
    res.json(observaciones)
}

// Inserción de una observación:
export const post = async (req, res) => {
    const {
        observacion
    } = req.body

    const obs = await prisma.DocEtapa1.create({
        data: {
            observacion
        }
    })

    res.json(obs)
}

// Actualizar una observacion:
export const put = async (req, res) => {
    const {
        observacion
    } = req.body // Info que obtendrá del body
    const obs = await prisma.alumno.update({
        data: {
            observacion
        },
        where: {
            id
        }
    })
    res.json(obs)
}