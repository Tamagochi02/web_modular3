import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener documento etapa 3:
export const get = async (req, res) => {
    const etapa3 = await prisma.DocEtapa3.findMany()
    res.json(etapa3)
}

// Crear un etapa 3:
export const post = async (req, res) => {
    const {
        url
    } = req.body

    const etapa3 = await prisma.DocEtapa3.create({
        data: {
            url
        }
    })

    res.json(etapa3)
}