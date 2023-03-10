import {get,post,put} from "./../../backend/controllers/proyectoController"

// Funcion CRUD que conecta al controlador del proyecto:
export default function proyecto(req, res) {
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