import { Router } from "express";
import {getGrados,getGrado,updateGrado,deleteGrado,insertarGrado,getGradosNivel,getGradoJornada,getGradoProfesor} from "../controllers/grados";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
// Mi primer Appi Queza

const router=Router();

router.get("/",getGrados);
router.get("/:id",checkJwt,getGrado);
router.put("/:id",checkJwt,updateGrado);
router.delete("/:id",checkJwt,deleteGrado);
router.post("/",checkJwt,insertarGrado);
router.get("/grado-nivel/:id", checkJwt, getGradosNivel);
router.get("/grado-profesor/:id", checkJwt, getGradoProfesor);
router.get("/grado-jornada/:id",checkJwt,getGradoJornada);

export{router};