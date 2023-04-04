import { prisma } from "../../lib/prisma"
import type { IronNextApiHandler } from "../../lib/ironSessionConfig"

export const readDocumentsByProyectId: IronNextApiHandler = async (req, res) => {
    const { proyectoid } = req.query;
    const proyect = await prisma.proyecto.findUnique({
        where: { id: proyectoid.toString() }
    })
    if (!proyect) {
        return res.status(404).json({ message: `Proyect with id ${proyectoid} not found` })
    }
    const document = await prisma.documento.findMany({
        where: {
            proyectoId: proyect.id
        },
        include: {
            DocEtapa1: true,
            DocEtapa2: true,
            DocEtapa3: true
        }
    })
    res.json(document)
}

export const readDocumentById: IronNextApiHandler = async (req, res) => {
    const { documentId } = req.query;
    const document = await prisma.documento.findFirst({
        where: {
            id: documentId.toString()
        },
        include: {
            DocEtapa1: true,
            DocEtapa2: true,
            DocEtapa3: true
        }
    })
    if (!document) {
        return res.status(404).json({ message: `Document with id ${documentId} not found` })
    }
    res.json(document)
}

export const CreateDocument: IronNextApiHandler = async (req, res) => {
    const { nombre, titulo, etapa } = req.body
    const { proyectoid } = req.query;
    const proyect = await prisma.proyecto.findUnique({
        where: { id: proyectoid.toString() }
    })
    const doc = await prisma.documento.create({
        data: {
            nombre, titulo, etapa,
            proyecto: {
                connect: { id: proyect.id }
            }
        }
    })
    res.json(doc)
}

export const UpdateDocument: IronNextApiHandler = async (req, res) => {
    const { nombre, titulo, etapa } = req.body
    const user = await prisma.documento.update({
        data: {
            nombre, titulo, etapa
        },
        where: {
            id: ""
        }
    })
    res.json(user)
}