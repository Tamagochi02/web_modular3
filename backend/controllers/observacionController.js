import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener todos los observaciones:
export const get = async (req, res) => {
    const observaciones = await prisma.Observacion.findMany()
    res.json(observaciones)
}

// Inserción de una observación:
export const post = async (req, res) => {
    const {
        observacion, usuarioID
    } = req.body
    const { documentoid } = req.query;

    const obs = await prisma.Observacion.create({
        data: {
            observacion, usuarioID
        }
    })

    // Crea la relacion entre observación y documento:
    const relObservacionDocumento = await prisma.DocumentoObservacion.create({
        data: {
            documento: {
                connect: {
                    id: documentoid
                }
            },
            observacion: {
                connect: {
                    id: obs.id
                }
            }
        }
    })

    const docconobservacion = await prisma.Observacion.findUnique({ // Muestra el la observacion
        where: {
            id: obs.id
        },
        include:{ // para incluir registros relacionados
            documentoObservacion: true
        }
    })
    res.json(docconobservacion)
}

// Actualizar una observacion:
export const put = async (req, res) => {
    const {
        observacion
    } = req.body // Info que obtendrá del body
    const obs = await prisma.Observacion.update({
        data: {
            observacion
        },
        where: {
            id
        }
    })
    res.json(obs)
}