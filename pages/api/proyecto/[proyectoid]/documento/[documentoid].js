
import {post} from "../../../../../backend/controllers/relaciondocumentoproyectoController"

export default async function proyecto(req, res) {
    if (req.method=="POST") 
        return post(req, res)
    return res.status(400).json({})
}