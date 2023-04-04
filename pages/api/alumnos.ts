import { privateRoute } from "../../lib/ironSessionConfig";
import { readAlumnos, createAlumno, updateAlumno } from "../../backend/controllers/alumnoController"
import { Handler } from '../../backend/Handler'

// Aqui creamos la ruta por la que llegaran todas las peticiones
// y asignamos un handlre que funcionara como orquestador
const handler = new Handler({
    get: readAlumnos,
    post: createAlumno,
    put: updateAlumno,
});

// No olvidemos exportar de manera predeterminada
// el listener de nuestro orquestador
export default privateRoute(handler.listener())
