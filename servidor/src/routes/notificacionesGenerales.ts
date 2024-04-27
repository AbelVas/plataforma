import { Router } from "express";
import {getNotificacionesVistasDocentes,vistoNotificacionesDocente,getNotificacionesVistasDocentesEnviadas} from "../controllers/notificacionesGenerales"
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/notificaciones-docente/:id/:idRol",checkJwt,getNotificacionesVistasDocentes)
router.get("/notificaciones-Enviadas/:id/:idRol",checkJwt,getNotificacionesVistasDocentesEnviadas)
router.post("/notificaciones-docente-vistas/:id/:idRol/:idNotificacion",vistoNotificacionesDocente)

export{router};