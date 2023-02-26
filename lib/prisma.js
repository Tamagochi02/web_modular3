const { PrismaClient } = require("@prisma/client");

export let prisma 

// Validar que al modificar no se vuelva a crear una conexion
if(process.env.NODE_ENV=='production'){
    prisma = new PrismaClient()
} else { // si estamos en modo de desarrollo
    if(!global.prisma){ // Si no hay una conexion    
        global.prisma = new PrismaClient() // Crea una nueva
    }
    prisma = global.prisma // Si la hay solo la retorna o la trae
}

