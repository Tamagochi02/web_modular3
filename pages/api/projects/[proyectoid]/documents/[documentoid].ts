import { } from "@/controllers/documentoController"
import { Handler } from "@/backend/Handler"
import { privateRoute } from "@/lib/ironSessionConfig"

const handler = new Handler({
})

export default privateRoute(handler.listener())
