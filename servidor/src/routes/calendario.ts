import { Router } from "express";
import {getActividadesAlumno,getActividadesTutor,getActividadesProfesor,getActividadesPorExamen,getActividadesPorTarea,getActividadesPorForo} from "../controllers/calendario";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/alumno/:id",checkJwt,getActividadesAlumno);
router.get("/profesor/:id",checkJwt,getActividadesTutor);
router.get("/tutor/:id",checkJwt,getActividadesProfesor);
router.get("/alumno-examen/:id",checkJwt,getActividadesPorExamen);
router.get("/alumno-tarea/:id",checkJwt,getActividadesPorTarea);
router.get("/alumno-foro/:id",checkJwt,getActividadesPorForo);
export{router};