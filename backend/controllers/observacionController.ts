import { prisma } from "../../lib/prisma"
import type { IronNextApiHandler } from "../../lib/ironSessionConfig"

export const readByDocumentId: IronNextApiHandler = async (req, res) => {
    const { documentId } = req.query;
    const observaciones = await prisma.observacion.findMany({
        where: { documentoId: documentId.toString() }
    })
    res.json(observaciones)
}

export const createObservation: IronNextApiHandler = async (req, res) => {
    const { documentId } = req.query
    const { observacion } = req.body

    const document = await prisma.documento.findFirst({
        where: {
            id: documentId.toString()
        }
    })
    if (!document) {
        return res.status(404).json({ message: `Document with id ${documentId} not found` })
    }
    const observacionCreated = await prisma.observacion.create({
        data: {
            observacion,
            documento: {
                connect: {
                    id: document.id
                }
            },
            usuario: {
                connect: {
                    id: req.session.user.id
                }
            }
        }
    })
    res.json(observacionCreated)
}
