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
    const user = await prisma.Usuario.create({ // Crea el usuario sin matricula
        data: {
            rol: "Alumno",
            nombre, correo, contrasena,
        }
    })
    const matriculaCreated = await prisma.Matricula.create({ // Crea la matricula conectandola a un usuario existente
        data: {
            matricula, 
            usuario:{
                connect:{
                    id: user.id
                }
            }
        }
    })
    const userWithMatricula = await prisma.Usuario.findUnique({ // Muestra el usuario
        where: {
            id: user.id
        },
        include:{
            Matricula: true
        }
    })
    res.json(userWithMatricula)
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