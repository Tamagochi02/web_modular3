import { readProyectById } from "@/controllers/proyectoController"
import { Handler } from "@/backend/Handler"
import { privateRoute } from "@/lib/ironSessionConfig"

const handler = new Handler({
    get: readProyectById
})

export default privateRoute(handler.listener())
