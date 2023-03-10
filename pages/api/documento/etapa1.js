import {get,post,put} from "./../../../backend/controllers/etapa1Controller"

// Funcion CRUD que conecta al controlador de etapa 1:
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