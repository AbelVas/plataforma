"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const notificacionesGenerales_1 = require("../controllers/notificacionesGenerales");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/notificaciones-docente/:id/:idRol", session_1.checkJwt, notificacionesGenerales_1.getNotificacionesVistasDocentes);
router.get("/notificaciones-Enviadas/:id/:idRol", session_1.checkJwt, notificacionesGenerales_1.getNotificacionesVistasDocentesEnviadas);
router.post("/notificaciones-docente-vistas/:id/:idRol/:idNotificacion", notificacionesGenerales_1.vistoNotificacionesDocente);
