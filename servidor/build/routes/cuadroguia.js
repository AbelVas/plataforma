"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cuadroguia_1 = require("../controllers/cuadroguia");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
//CUADRO DOCENTE DE CURSOS
router.get("/actividades-curso/:idCurso/:idUnidad", session_1.checkJwt, cuadroguia_1.actividadesCursoGrado);
router.get("/alumnos/:idGrado", session_1.checkJwt, cuadroguia_1.alumnosGrado);
router.get("/cursos-cuadro-guia/:idGrado", session_1.checkJwt, cuadroguia_1.cursosGradoCuadroGuia);
router.get("/:idCurso/:idUnidad/:idGrado/", session_1.checkJwt, cuadroguia_1.notasalumnosFinal);
router.get("/:idGrado/:idUnidad", session_1.checkJwt, cuadroguia_1.notasalumnosCursoFinal);
router.get("/:idGrado/:idCurso", session_1.checkJwt, cuadroguia_1.getCursoBimestreConsolidado);
