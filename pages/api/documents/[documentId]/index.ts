import { readDocumentById } from "@/controllers/documentoController"
import { Handler } from "@/backend/Handler"
import { privateRoute } from "@/lib/ironSessionConfig"

const handler = new Handler({
    get: readDocumentById
})

export default privateRoute(handler.listener())
