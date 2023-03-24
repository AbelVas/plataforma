import { Router} from "express";
import { checkJwt } from "../middleware/session";
import { alumnosGrado, alumnoNotasBoleta } from "../controllers/boletas";

const router = Router();
router.get("/:idGrado/:idAlumno",checkJwt,alumnosGrado)
router.get("/boleta-final/:idGrado/:idAlumno",checkJwt,alumnoNotasBoleta)

export {router}