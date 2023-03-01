import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener todos los docentes:
export const get = async (req, res) => {
    const users = await prisma.Usuario.findMany({
        where: {
            rol: "Docente"
        }})
    res.json(users)
}

// Inserción de un registro:
export const post = async (req, res) => {
    const {
        nombre, correo, contrasena
    } = req.body
    const user = await prisma.Usuario.create({
        data: {
            rol: "Docente",
            nombre, correo, contrasena
        }
    })
    res.json(user)
}

// Actualizar un registro:
export const put = async (req, res) => {
    const {
        nombre, correo, contrasena,
        foto, estaActivo, ActualizadoEn, id, docenteId
    } = req.body // Info que obtendrá del body
    const user = await prisma.alumno.update({
        data: {
            nombre, correo, contrasena, foto, estaActivo, ActualizadoEn
            /* proyectoDocente:{
                connect:{
                    usuarioId: docenteId
                }
            } */
        },
        where: {
            id
        }
    })
    res.json(user)
}