import { Router } from "express";
import { getTutores,getTutor,updateTutor,deleteTutor,insertarTutor,getTutorconAlumno,compararPass } from "../controllers/tutores";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";
 
const router=Router();

router.get("/",checkJwt,getTutores);
router.get("/:id",checkJwt,getTutor);
router.post("/",logMiddleware,insertarTutor);
router.put("/:id",checkJwt,updateTutor);
router.delete("/:id",checkJwt,deleteTutor);
router.get("/tutor-alumno/:id",checkJwt,getTutorconAlumno);
router.post("/pass/:id",checkJwt,compararPass);


export {router};