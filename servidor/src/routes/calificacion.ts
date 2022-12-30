import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { getAlumnosCalificacionActividadCursUnidad,calificarActividad } from "../controllers/calificacion";

const router=Router();

router.post("/:idCurso",checkJwt,getAlumnosCalificacionActividadCursUnidad);
router.put("/:idDetalleActividad",checkJwt,calificarActividad)

export {router}