import { Router} from "express";
import { getCursoBimestreConsolidado,actividadesCursoGrado,notasalumnosFinal,alumnosGrado } from "../controllers/cuadroguia";
import { checkJwt } from "../middleware/session";

const router = Router();
router.get("/actividades-curso/:idCurso/:idUnidad",checkJwt,actividadesCursoGrado)
router.get("/alumnos/:idGrado",checkJwt,alumnosGrado)
router.get("/:idCurso/:idUnidad/:idGrado/",checkJwt,notasalumnosFinal)
router.get("/:idGrado/:idCurso",checkJwt,getCursoBimestreConsolidado)


export {router}