"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const session_1 = require("../middleware/session");
const gradoguiaasignacion_1 = require("../controllers/gradoguiaasignacion");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/existentes/", session_1.checkJwt, gradoguiaasignacion_1.getObtenerGuiasExistentes);
router.get("/faltantes/", session_1.checkJwt, gradoguiaasignacion_1.getGradosSinGuias);
router.delete("/eliminar/:id", session_1.checkJwt, gradoguiaasignacion_1.eliminarGradoGuia);
router.post("/crear/", session_1.checkJwt, gradoguiaasignacion_1.insertGradosGuias);
router.put("/editar/", session_1.checkJwt, gradoguiaasignacion_1.actualizarGradoGuia);