import { Router } from "express";
import {getRecursosWeb,getRecursoWeb,updateRecursoWeb,deleteRecursoWeb,insertRecursoWeb,getRecursoWebGrado,
    deleteRecursoArchivo,updateRecursoArchivo,insertRecursoArchivo,getRecursoArchivoGrado} from "../controllers/recursoweb";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
// Mi primer Appi Queza

const router=Router();

router.get("/",checkJwt,getRecursosWeb);
router.get("/:id",checkJwt,getRecursoWeb);
router.put("/:id",checkJwt,updateRecursoWeb);
router.delete("/:id",checkJwt,deleteRecursoWeb);
router.post("/",checkJwt,insertRecursoWeb);
router.get("/recurso-grado/:id",checkJwt,getRecursoWebGrado);

// Recursos de Archivos
router.get("/recurso-archivo-grado/:id",checkJwt,getRecursoArchivoGrado);
router.post("/recurso-archivo/",checkJwt,insertRecursoArchivo);
router.put("/recurso-archivo/:id",checkJwt,updateRecursoArchivo);
router.delete("/recurso-archivo/:id",checkJwt,deleteRecursoArchivo);


export{router};