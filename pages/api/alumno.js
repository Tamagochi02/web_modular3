import { privateRoute } from "../../lib/ironSessionConfig";
import {get,post,put} from "./../../backend/controllers/alumnoController"

// Funcion CRUD que conecta al controlador de alumno:
function alumno(req, res) {
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

export default privateRoute(alumno, "POST") // funcion para asignar ruta privada enviando un handler, en este caso alumno