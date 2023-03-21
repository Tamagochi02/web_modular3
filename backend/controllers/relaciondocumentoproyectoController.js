import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd


export const post = async (req, res) => {
    const {proyectoid, documentoid} = req.query;
    // Validar si existe un documento con la id que le pasemos de la ruta:
    try {
        await prisma.Documento.findUniqueOrThrow({ // Encuentra un registro y lanza una excepcion en caso contrario
            where: {
                id: documentoid
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({"message":`Document with id ${documentoid} not found`})
    }

    // Validar si existe un proyecto con la id que le pasemos de la ruta:
    try {
        await prisma.Proyecto.findUniqueOrThrow({
            where: {
                id: proyectoid
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({"message":`Project with id ${proyectoid} not found`})
    }


    // Crea la relacion entre proyecto y documento:
    const relProyectoDocumento = await prisma.ProyectoDocu.create({
        data: {
            documento: {
                connect:{
                    id: documentoid
                }
            },
            proyecto:{
                connect:{
                    id: proyectoid
                }
            }
        }
    })
    return res.json(relProyectoDocumento)
}