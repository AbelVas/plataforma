import { Router } from "express";
import {getRecursosWeb,getRecursoWeb,updateRecursoWeb,deleteRecursoWeb,insertRecursoWeb} from "../controllers/recursoweb";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
// Mi primer Appi Queza

const router=Router();

router.get("/",checkJwt,getRecursosWeb);
router.get("/:id",checkJwt,getRecursoWeb);
router.put("/:id",checkJwt,updateRecursoWeb);
router.delete("/:id",checkJwt,deleteRecursoWeb);
router.post("/",checkJwt,insertRecursoWeb);

export{router};