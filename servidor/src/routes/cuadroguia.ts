import { Router} from "express";
import { getCursoBimestreConsolidado } from "../controllers/cuadroguia";
import { checkJwt } from "../middleware/session";

const router = Router();

router.post("/:idGrado",checkJwt,getCursoBimestreConsolidado)

export {router}