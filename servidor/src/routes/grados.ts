import { Router } from "express";
import {getGrados,getGrado,updateGrado,deleteGrado,insertarGrado,getGradosNivel,getGradoProfesor} from "../controllers/grados";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
import { getGradoPorProfesor } from "../service/grados";
// Mi primer Appi Queza

const router=Router();

router.get("/",checkJwt,getGrados);
router.get("/:id",checkJwt,getGrado);
router.put("/:id",checkJwt,updateGrado);
router.delete("/:id",checkJwt,deleteGrado);
router.post("/",checkJwt,insertarGrado);
router.get("/grado-nivel/:id", checkJwt, getGradosNivel);
router.get("/grado-profesor/:id", checkJwt, getGradoProfesor);

export{router};