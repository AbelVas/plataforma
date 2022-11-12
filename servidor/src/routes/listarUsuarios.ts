import { Router} from "express";
import {getAdmin,getAdmins,getProfesor,getProfesores,getAlumno,getAlumnos} from "../controllers/listarUsuarios"
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/admin",getAdmins);
router.get("/admin/:id",getAdmin);

router.get("/alumno",getAlumnos);
router.get("/alumno/:id",getAlumno);

router.get("/profesor",getProfesores);
router.get("/profesor/:id",getProfesor);

export {router};