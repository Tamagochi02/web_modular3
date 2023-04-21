import { privateRoute } from "../../lib/ironSessionConfig";
import { readDocentes, createDocente, updateDocente } from "../../backend/controllers/docenteController"
import { Handler } from '../../backend/Handler'

const handler = new Handler({
    get: readDocentes,
    post: createDocente,
    put: updateDocente,
});

export default privateRoute(handler.listener(), "POST")
