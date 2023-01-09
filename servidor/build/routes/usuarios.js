"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", session_1.checkJwt, usuarios_1.getAlumnos);
router.get("/:id", session_1.checkJwt, usuarios_1.getAlumno);
router.get("/alumno-grado/:id", session_1.checkJwt, usuarios_1.getAlumnosGrado);
router.post("/", session_1.checkJwt, usuarios_1.insertarAlumno);
router.put("/:id", session_1.checkJwt, usuarios_1.updateAlumno);
router.delete("/:id", session_1.checkJwt, usuarios_1.deleteAlumno);
router.post("/pass/:id", session_1.checkJwt, usuarios_1.compararPass);
