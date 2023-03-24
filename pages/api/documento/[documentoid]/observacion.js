import {get,post,put} from "../../../../backend/controllers/observacionController"

// Funcion CRUD que conecta al controlador de observacion:
export default function observacion(req, res) {
    switch (req.method) {
        case 'GET':
            get(req, res)
            break;

        case 'POST':
            post(req, res)
            break;
            
        case 'PUT':
            put(req, res)
            break;

        default:
            res.status(400).json({})
            break;
    }
}