import { Router } from "express";
import { getAlumnos,getAlumno,getAlumnosGrado,updateAlumno,deleteAlumno,insertarAlumno } from "../controllers/usuarios";
import { logMiddleware } from "../middleware/log";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getAlumnos);
router.get("/:id",checkJwt,getAlumno);
router.get("/grado/:id",checkJwt,getAlumnosGrado);
router.post("/",checkJwt,insertarAlumno);
router.put("/:id",checkJwt,updateAlumno);
router.delete("/:id",checkJwt,deleteAlumno);


export {router};