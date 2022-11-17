import { Router } from "express";
import {getGrados,getGrado,updateGrado,deleteGrado,insertarGrado} from "../controllers/grados";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
// Mi primer Appi Queza

const router=Router();

router.get("/",checkJwt,getGrados);
router.get("/:id",checkJwt,getGrado);
router.put("/:id",checkJwt,updateGrado);
router.delete("/:id",checkJwt,deleteGrado);
router.post("/",checkJwt,insertarGrado);

export{router};