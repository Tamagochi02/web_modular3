import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener todos los documentos:
export const get = async (req, res) => {
    const users = await prisma.Documento.findMany()
    res.json(users)
}

// Crear un documento:
export const post = async (req, res) => {
    const {
        nombre, titulo, tipo
    } = req.body

    const doc = await prisma.Documento.create({
        data: {
            nombre, titulo, tipo
        }
    })

    res.json(doc)
}

// Actualizar un documento:
export const put = async (req, res) => {
    const {
        nombre, titulo, tipo
    } = req.body // Info que obtendrá del body
    const user = await prisma.Documento.update({
        data: {
            nombre, titulo, tipo
        },
        where: {
            id
        }
    })
    res.json(user)
}