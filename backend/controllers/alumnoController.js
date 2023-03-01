import { prisma } from "../../lib/prisma" // Importa prisma client para enviar peticiones a la bd

// Obtener todos los alumnos:
export const get = async (req, res) => {
    const users = await prisma.Usuario.findMany({
        where: {
            rol: "Alumno"
        }})
    res.json(users)
}

// Inserción de un registro:
export const post = async (req, res) => {
    const {
        nombre, correo, contrasena, matricula
    } = req.body
    const user = await prisma.Usuario.create({
        data: {
            rol: "Alumno",
            nombre, correo, contrasena,
            matricula:{
                connect: {
                    matricula: matricula
                }
            },
        }
    })
    res.json(user)
}

// Actualizar un registro:
export const put = async (req, res) => {
    const {
        nombre, correo, contrasena, matricula,
        foto, estaActivo, ActualizadoEn, id, proyectoAlumnoId, docenteId
    } = req.body // Info que obtendrá del body
    const user = await prisma.alumno.update({
        data: {
            nombre, correo, contrasena, foto, matricula, estaActivo, ActualizadoEn,
            proyectoAlumnos:{
                connect:{
                    id: proyectoAlumnoId
                }
            },
            proyectoDocente:{
                connect:{
                    usuarioId: docenteId
                }
            }
        },
        where: {
            id
        }
    })
    res.json(user)
}