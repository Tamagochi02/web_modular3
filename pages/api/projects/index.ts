import { readProyects, createProyect } from "@/controllers/proyectoController"
import { Handler } from "@/backend/Handler"
import { privateRoute } from "@/lib/ironSessionConfig"

const handler = new Handler({
    get: readProyects,
    post: createProyect
})

export default privateRoute(handler.listener())
