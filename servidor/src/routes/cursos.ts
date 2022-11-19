import { Router} from "express";
import {getCurso, getCursos, updateCurso,deleteCurso, insertCurso, getCursoporGrado} from "../controllers/cursos"
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

export {router}