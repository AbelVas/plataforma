import { Router } from "express";
import { getProfesores,getProfesor,updateProfesor,deleteProfesor,insertarProfesor,compararPass } from "../controllers/profesores";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/profesor/",checkJwt,getProfesores);
router.get("/profesor/:id",checkJwt,getProfesor);
router.post("/profesor/",logMiddleware,insertarProfesor);
router.put("/profesor/:id",checkJwt,updateProfesor);
router.delete("/profesor/:id",checkJwt,deleteProfesor);
router.post("/profesor/pass/:id",checkJwt,compararPass);


export {router};