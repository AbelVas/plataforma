import { Router } from "express";
import {updateGuiaGrado,deleteGuiaGrado,insertGuiaGrado,getGuiaGrado,getGradoGuiaProfesor} from "../controllers/guiagrado";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";

const router=Router();

//Por mientras tengo el get
router.get("/",checkJwt,getGuiaGrado);
router.put("/:id",checkJwt,updateGuiaGrado);
router.delete("/:id",checkJwt,deleteGuiaGrado);
router.post("/",checkJwt,insertGuiaGrado);
router.get("/gradoguia-profesor/:id",checkJwt,getGradoGuiaProfesor)
//api que
export{router};