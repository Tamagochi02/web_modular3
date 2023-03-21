import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener documento etapa 1:
export const get = async (req, res) => {
    const etapa1 = await prisma.DocEtapa1.findMany()
    res.json(etapa1)
}

// Crear un etapa 1:
export const post = async (req, res) => {
    const {
        resumen, palabrasClave, introduccion, desarrollo, conclusion, referencias, documentoId
    } = req.body

    // Validar si existe un documento con la id que le pasemos del body:
    try {
        await prisma.Documento.findUniqueOrThrow({
            where: {
                id: documentoId
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({"message":`Document with id ${documentoId} not found`})
    }


    const etapa1 = await prisma.DocEtapa1.create({
        data: {
            resumen, palabrasClave, introduccion, desarrollo, conclusion, referencias,
            documento: { // Al crear una etapa1 hace la conexión con un documento (Debe estar ya creado)
                connect: {
                    id: documentoId
                }
            }
        }
    })

    res.json(etapa1)
}
