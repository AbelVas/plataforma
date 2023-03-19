import { Router} from "express";
import { getCursoBimestreConsolidado,actividadesCursoGrado,notasalumnosFinal,alumnosGrado,cursosGradoCuadroGuia,notasalumnosCursoFinal } from "../controllers/cuadroguia";
import { checkJwt } from "../middleware/session";

const router = Router();
//CUADRO DOCENTE DE CURSOS
router.get("/actividades-curso/:idCurso/:idUnidad",checkJwt,actividadesCursoGrado)
router.get("/alumnos/:idGrado",checkJwt,alumnosGrado)
router.get("/cursos-cuadro-guia/:idGrado",checkJwt,cursosGradoCuadroGuia)
router.get("/:idCurso/:idUnidad/:idGrado/",checkJwt,notasalumnosFinal)
router.get("/:idGrado/:idUnidad",checkJwt,notasalumnosCursoFinal)
router.get("/:idGrado/:idCurso",checkJwt,getCursoBimestreConsolidado)



export {router}