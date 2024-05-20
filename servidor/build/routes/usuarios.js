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
router.post("/", usuarios_1.insertarAlumno);
router.put("/:id", session_1.checkJwt, usuarios_1.updateAlumno);
router.delete("/:id", session_1.checkJwt, usuarios_1.deleteAlumno);
router.post("/pass/:id", session_1.checkJwt, usuarios_1.compararPass);
router.post("/ver_notas/:id", usuarios_1.verNotasAlumnos);
router.get("/obtener-notas/:id", session_1.checkJwt, usuarios_1.getNotasVer);
//Obtener mayoria de estados
router.get("/EstadoAlumno/:id", session_1.checkJwt, usuarios_1.ObtEstadoAlumno);
router.get("/EstadoProfesor/:id", session_1.checkJwt, usuarios_1.ObtEstadoProfesor);
router.get("/EstadoTutor/:id", session_1.checkJwt, usuarios_1.ObtEstadoTutor);
//Editar los estados
router.post("/EstadoAlumnoUpdate/:id", usuarios_1.updateEstadoAlumno);
router.post("/EstadoProfesorUpdate/:id", usuarios_1.updateEstadoProfesor);
router.post("/EstadoTutorUpdate/:id", usuarios_1.updateEstadoTutor);
//logica de foto de perfil
router.put("/alumno-foto-perfil-update/:id", session_1.checkJwt, usuarios_1.fotoPerfilAlumnoController);
router.get("/alumno-foto-perfil/:id", session_1.checkJwt, usuarios_1.getFotoPerfilActivaAlumno);
