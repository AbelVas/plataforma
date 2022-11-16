import { Router } from "express";
import { getProfesores,getProfesor,updateProfesor,deleteProfesor,insertarProfesor } from "../controllers/profesores";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getProfesores);
router.get("/:id",checkJwt,getProfesor);
router.put("/",checkJwt,insertarProfesor);
router.put("/:id",checkJwt,updateProfesor);
router.delete("/:id",checkJwt,deleteProfesor);


export {router};