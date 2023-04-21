import { privateRoute } from "../../lib/ironSessionConfig";
import { readAdmin, createAdmin, updateAdmin } from "../../backend/controllers/adminController"
import { Handler } from '../../backend/Handler'

const handler = new Handler({
    get: readAdmin,
    post: createAdmin,
    put: updateAdmin,
});

export default privateRoute(handler.listener())
