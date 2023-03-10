import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener documento etapa 2:
export const get = async (req, res) => {
    const etapa2 = await prisma.DocEtapa2.findMany()
    res.json(etapa2)
}

// Crear un etapa 2:
export const post = async (req, res) => {
    const {
        descripcion, objGeneral, objsMetas, alcance, herramientas
    } = req.body

    const etapa2 = await prisma.DocEtapa2.create({
        data: {
            descripcion, objGeneral, objsMetas, alcance, herramientas
        }
    })

    res.json(etapa2)
}