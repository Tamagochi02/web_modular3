import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener documento etapa 1:
export const get = async (req, res) => {
    const etapa1 = await prisma.DocEtapa1.findMany()
    res.json(etapa1)
}

// Crear un etapa 1:
export const post = async (req, res) => {
    const {
        resumen, palabrasClave, introduccion, desarrollo, conclusion, referencias
    } = req.body

    const etapa1 = await prisma.DocEtapa1.create({
        data: {
            resumen, palabrasClave, introduccion, desarrollo, conclusion, referencias
        }
    })

    res.json(etapa1)
}