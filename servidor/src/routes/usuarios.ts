import { Router } from "express";
import { fotoPerfilAlumnoController,getFotoPerfilActivaAlumno,getAlumnos,getAlumno,getAlumnosGrado,updateAlumno,deleteAlumno,insertarAlumno,compararPass,verNotasAlumnos,getNotasVer
,ObtEstadoAlumno,ObtEstadoProfesor,ObtEstadoTutor,updateEstadoAlumno,updateEstadoProfesor,updateEstadoTutor,getTutorporAlumnoControl,getAlumnosPorCodigo} from "../controllers/usuarios";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getAlumnos);
router.get("/:id",checkJwt,getAlumno);
router.get("/alumno-grado/:id",checkJwt,getAlumnosGrado);
router.post("/",insertarAlumno);
router.put("/:id",checkJwt,updateAlumno);
router.delete("/:id",checkJwt,deleteAlumno);
router.post("/pass/:id",checkJwt,compararPass);
router.post("/ver_notas/:id",verNotasAlumnos)
router.get("/obtener-notas/:id",checkJwt,getNotasVer)
//Obtener mayoria de estados
router.get("/EstadoAlumno/:id",checkJwt,ObtEstadoAlumno);
router.get("/EstadoProfesor/:id",checkJwt,ObtEstadoProfesor);
router.get("/EstadoTutor/:id",checkJwt,ObtEstadoTutor);
//Editar los estados
router.post("/EstadoAlumnoUpdate/:id",updateEstadoAlumno);
router.post("/EstadoProfesorUpdate/:id",updateEstadoProfesor);
router.post("/EstadoTutorUpdate/:id",updateEstadoTutor);
//logica de foto de perfil
router.put("/alumno-foto-perfil-update/:id",checkJwt,fotoPerfilAlumnoController)
router.get("/alumno-foto-perfil/:id",checkJwt,getFotoPerfilActivaAlumno)
router.get("/TutorAlumno/:id",checkJwt,getTutorporAlumnoControl);
//Buscar alumnos por código
router.get("/alumno-por-codigo/:id/:idTutor",checkJwt,getAlumnosPorCodigo)


export {router};