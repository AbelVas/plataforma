import { Router } from "express";
import { deleteTutorAlumno,insertTutorAlumno,tutoresAlumno,getTutores,getTutor,updateTutor,deleteTutor,insertarTutor,getTutorconAlumno,compararPass,getAlumnoporTutor,GetNotasTutor} from "../controllers/tutores";
import { checkJwt } from "../middleware/session";
 
const router=Router();

router.get("/",checkJwt,getTutores);
router.get("/:id",checkJwt,getTutor);
router.get("/notas/:id",checkJwt,GetNotasTutor);
router.post("/",checkJwt,insertarTutor);
router.put("/:id",checkJwt,updateTutor);
router.delete("/:id",checkJwt,deleteTutor);
router.get("/tutor-alumno/:id",checkJwt,getTutorconAlumno);
router.get("/alumnos/:id",checkJwt,getAlumnoporTutor);
router.post("/pass/:id",checkJwt,compararPass);
router.get("/alumnotutor/:id",checkJwt,tutoresAlumno)
router.delete("/alumnotutor/:idTutor/:idAlumno",checkJwt,deleteTutorAlumno);
router.post("/alumnotutor/",checkJwt,insertTutorAlumno)

export {router};