import { createEtapa3 } from "@/controllers/etapasController"
import { Handler } from "@/backend/Handler"
import { privateRoute } from "@/lib/ironSessionConfig"

const handler = new Handler({
    post: createEtapa3
})

export default privateRoute(handler.listener())
