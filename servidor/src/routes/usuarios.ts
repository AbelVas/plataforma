import { Router } from "express";
import { getAlumnos,getAlumno,getAlumnosGrado,updateAlumno,deleteAlumno,insertarAlumno,compararPass } from "../controllers/usuarios";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getAlumnos);
router.get("/:id",checkJwt,getAlumno);
router.get("/alumno-grado/:id",checkJwt,getAlumnosGrado);
router.post("/",checkJwt,insertarAlumno);
router.put("/:id",checkJwt,updateAlumno);
router.delete("/:id",checkJwt,deleteAlumno);
router.post("/pass/:id",checkJwt,compararPass);


export {router};