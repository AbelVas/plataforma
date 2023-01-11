import { Router } from "express";
import {getActividadesAlumno,getActividadesTutor,getActividadesProfesor,getActividadesPorExamen,getActividadesPorTarea,getActividadesPorForo,getActividadesCalificacion,getActividadesCalificacionTotal} from "../controllers/calendario";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/alumno/:id",checkJwt,getActividadesAlumno);
router.get("/profesor/:id",checkJwt,getActividadesProfesor);
router.get("/tutor/:id",checkJwt,getActividadesTutor);
router.get("/alumno-examen/:id/:al",checkJwt,getActividadesPorExamen);
router.get("/alumno-tarea/:id/:al",checkJwt,getActividadesPorTarea);
router.get("/alumno-foro/:id/:al",checkJwt,getActividadesPorForo);
router.get("/alumno-calificaciones/:id/:al",checkJwt,getActividadesCalificacion);
router.get("/alumno-calificaciontotal/:id/:al",checkJwt,getActividadesCalificacionTotal);
export{router};