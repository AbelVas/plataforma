import { Router } from "express";
import { getProfesores,getProfesor,updateProfesor,deleteProfesor,insertarProfesor } from "../controllers/profesores";
import { logMiddleware } from "../middleware/log";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getProfesores);
router.get("/:id",checkJwt,getProfesor);
router.post("/",checkJwt,insertarProfesor);
router.put("/:id",checkJwt,updateProfesor);
router.delete("/:id",checkJwt,deleteProfesor);


export {router};