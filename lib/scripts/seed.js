// seed para poder hacer acciones de prueba:
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const main = async () => {
    await prisma.user.create({
        data: {
            nombre: "Bryan",
            correo: "A03354@universidad-une.com",
            rol: "Alumno",
            contrasena: "A03354une",
            matricula: {
                connect: {
                    matricula: "A0335"
                }
            },
        },
        include: {
            matricula: true,
        }
    });

    /*await prisma.docente.create({ // Create many para insertar varios registros
        data:
        {
            nombre: 'Jose',
            apellidoPat: 'Navarro',
            apellidoMat: 'Rios',
            correo: 'navarro@universidad-une.com',
            foto: '',
            contrasena: 'navarro',

        }
    })*/

    /*     await prisma.proyectoE1.create({
            data: {
                nombre: "Prototipo de administrador de torneos de fútbol",
                urldocumento: "",
                docente: {
                    connect: {
                        codigo: "fd7b079c-fe01-4bdb-80b0-0923bf1dd6a2"
                    }
                },
            },
            include: {
                docente: true,
            }
        }) */

    /*await prisma.alumno.update({
        data: {
            proyectoE1: {
                connect: {
                    id: ""
                }
            },
        },
        where: {
            codigo: ""
        }
    })*/

    /*await prisma.proyectoE2.create({
        data: {
            nombre: "Prototipo de Gestión Administrativa Bibliotecaria.",
            urldocumento: "",
            docente: {
                connect: {
                    codigo: "09c38ed6-78b1-4009-a1f4-791284ac9666"
                }
            },
        },
        include: {
            docente: true,
        }
    })*/

    /*await prisma.alumno.update({
        data: {
            ProyectoE2: {
                connect: {
                    id: "39c57889-fbea-406d-b5b9-a0bc17103b3b"
                }
            },
        },
        where: {
            codigo: "Y19833089"
        }
    })*/

    /*await prisma.proyectoE3.create({
        data: {
            nombre: "Gestor de proyectos modulares",
            urldocumento: "",
            docente: {
                connect: {
                    codigo: "c3dc1047-67bd-4150-8248-b4a5da5a72aa"
                }
            },
        },
        include: {
            docente: true,
        }
    })*/

    /*await prisma.alumno.update({
        data: {
            ProyectoE3: {
                connect: {
                    id: "7dc30afd-df92-485d-927d-b15701614689"
                }
            },
        },
        where: {
            codigo: "Y19832996"
        }
    })*/
}

main()