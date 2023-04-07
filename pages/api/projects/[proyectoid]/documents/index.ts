import { readDocumentsByProyectId, CreateDocument } from "@/controllers/documentoController"
import { Handler } from "@/backend/Handler"
import { privateRoute } from "@/lib/ironSessionConfig"

const handler = new Handler({
    get: readDocumentsByProyectId,
    post: CreateDocument
})

export default privateRoute(handler.listener())
