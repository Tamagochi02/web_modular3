import { readByDocumentId, createObservation } from "@/controllers/observacionController"
import { Handler } from "@/backend/Handler"
import { privateRoute } from "@/lib/ironSessionConfig"

const handler = new Handler({
    get: readByDocumentId,
    post: createObservation
})

export default privateRoute(handler.listener())