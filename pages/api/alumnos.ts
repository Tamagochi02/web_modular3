import { privateRoute } from "../../lib/ironSessionConfig";
import { readAlumnos, createAlumno, updateAlumno } from "../../backend/controllers/alumnoController"
import { Handler } from '../../backend/Handler'

const handler = new Handler({
    get: readAlumnos,
    post: createAlumno,
    put: updateAlumno,
});

export default handler.listener()
