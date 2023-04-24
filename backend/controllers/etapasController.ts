import { prisma } from "../../lib/prisma"
import type { IronNextApiHandler } from "../../lib/ironSessionConfig"

export const createEtapa1: IronNextApiHandler = async (req, res) => {
    const { documentId } = req.query
    const { resumen, palabrasClave, introduccion,
        desarrollo, conclusion, referencias } = req.body;
    const document = await prisma.documento.findFirst({
        where: {
            id: documentId.toString()
        }
    })
    if (!document) {
        return res.status(404).json({ message: `Document with id ${documentId} not founc` })
    }
    const docEtapa1 = await prisma.docEtapa1.create({
        data: {
            resumen, palabrasClave, introduccion,
            desarrollo, conclusion, referencias,
            documento: {
                connect: {
                    id: document.id
                }
            }
        }
    })
    return res.json(docEtapa1)
}

export const createEtapa2: IronNextApiHandler = async (req, res) => {
    const { documentId } = req.query
    const { descripcion, objGeneral, objsMetas,
        alcance, herramientas } = req.body;
    const document = await prisma.documento.findFirst({
        where: {
            id: documentId.toString()
        }
    })
    if (!document) {
        return res.status(404).json({ message: `Document with id ${documentId} not founc` })
    }
    const docEtapa = await prisma.docEtapa2.create({
        data: {
            descripcion, objGeneral, objsMetas,
            alcance, herramientas,
            documento: {
                connect: {
                    id: document.id
                }
            }
        }
    })
    return res.json(docEtapa)
}

export const createEtapa3: IronNextApiHandler = async (req, res) => {
    const { documentId } = req.query
    const { url } = req.body;
    const document = await prisma.documento.findFirst({
        where: {
            id: documentId.toString()
        }
    })
    if (!document) {
        return res.status(404).json({ message: `Document with id ${documentId} not founc` })
    }
    const docEtapa1 = await prisma.docEtapa3.create({
        data: {
            url,
            documento: {
                connect: {
                    id: document.id
                }
            }
        }
    })
    return res.json(docEtapa1)
}
