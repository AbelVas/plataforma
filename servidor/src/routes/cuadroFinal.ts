import { Router} from "express";
import { notasalumnosCursoFinal } from "../controllers/cuadroFinal";
import { checkJwt } from "../middleware/session";

const router = Router();
router.get("/cuadro-final/:idGrado",notasalumnosCursoFinal)

export {router}