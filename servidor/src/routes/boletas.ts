import { Router} from "express";
import { checkJwt } from "../middleware/session";
import { alumnosGrado, alumnoNotasBoleta, alumnoNotasBoletaEspecial,alumnoNotasBoletaPromedioFinal } from "../controllers/boletas";

const router = Router();
router.get("/:idGrado/:idAlumno",checkJwt,alumnosGrado)
router.get("/boleta-final/:idGrado/:idAlumno",checkJwt,alumnoNotasBoleta)
router.get("/boleta-final-especial/:idGrado/:idAlumno",checkJwt,alumnoNotasBoletaEspecial)
router.get("/boleta-final-promedio-curso/:idCurso/:idGrado",alumnoNotasBoletaPromedioFinal)

export {router}