import { Router } from "express";
import {getNotificacionesVistasDocentes,vistoNotificacionesDocente} from "../controllers/notificacionesGenerales"
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/notificaciones-docente/:id/:idRol",checkJwt,getNotificacionesVistasDocentes)
router.post("/notificaciones-docente-vistas/:id/:idRol/:idNotificacion",vistoNotificacionesDocente)

export{router};