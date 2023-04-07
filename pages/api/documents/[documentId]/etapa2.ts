import { createEtapa2 } from "@/controllers/etapasController"
import { Handler } from "@/backend/Handler"
import { privateRoute } from "@/lib/ironSessionConfig"

const handler = new Handler({
    post: createEtapa2
})

export default privateRoute(handler.listener())
