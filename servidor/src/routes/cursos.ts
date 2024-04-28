import { Router} from "express";
import {obtenerImagenSubidCursosProfesorController,getCurso, getCursos, updateCurso,deleteCurso, insertCurso, getCursoporGrado, getCursoporProfesor,getCursoporGradoProfesor,obtenerCursosPorProfesorGradoSeccion,getCursosPorAlumno,getProfeCurso,getCursoporGradoProfesorAdmin,obtenerCursodeProfesorIndividual} from "../controllers/cursos"
import { logMiddleware } from "../middleware/log";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt,getCursos);
router.get("/:id", checkJwt,getCurso);
router.put("/:id", checkJwt,updateCurso);
router.delete("/:id", checkJwt, deleteCurso);
router.post("/", checkJwt, insertCurso);
router.get("/curso-grado/:id",checkJwt,getCursoporGrado);
router.get("/curso-profesor/:id",checkJwt, getCursoporProfesor);
router.get("/curso-profesor-grado/:id",checkJwt,getCursoporGradoProfesor);
router.post("/curso-grado-seccion/:id",checkJwt,obtenerCursosPorProfesorGradoSeccion);
router.get("/curso-alumno/:id",checkJwt,getCursosPorAlumno);
router.get("/profe-curso/:id", checkJwt,getProfeCurso);
router.get("/curso-profesor-grado-admin/:id",checkJwt,getCursoporGradoProfesorAdmin);
router.get("/curso-profesor-individual/:id",checkJwt,obtenerCursodeProfesorIndividual);
router.put("/foto-portada-curso/:id",checkJwt,obtenerImagenSubidCursosProfesorController)

export {router}