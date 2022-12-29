import { Router} from "express";
import {getCurso, getCursos, updateCurso,deleteCurso, insertCurso, getCursoporGrado, getCursoporProfesor,getCursoporGradoProfesor,obtenerCursosPorProfesorGradoSeccion} from "../controllers/cursos"
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

export {router}