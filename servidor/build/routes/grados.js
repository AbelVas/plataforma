"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const grados_1 = require("../controllers/grados");
const session_1 = require("../middleware/session");
// Mi primer Appi Queza
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", session_1.checkJwt, grados_1.getGrados);
router.get("/:id", session_1.checkJwt, grados_1.getGrado);
router.put("/:id", session_1.checkJwt, grados_1.updateGrado);
router.delete("/:id", session_1.checkJwt, grados_1.deleteGrado);
router.post("/", session_1.checkJwt, grados_1.insertarGrado);
router.get("/grado-nivel/:id", session_1.checkJwt, grados_1.getGradosNivel);
router.get("/grado-profesor/:id", session_1.checkJwt, grados_1.getGradoProfesor);
router.get("/grado-jornada/:id", session_1.checkJwt, grados_1.getGradoJornada);
router.get("/grado-seccion-nivel-jornada/:id", session_1.checkJwt, grados_1.GetGradoSeccion);
