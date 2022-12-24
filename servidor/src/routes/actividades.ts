import { Router } from "express";
import { insertarTarea,getActividadesCurso,deleteActividadCurso,updateActividad,duplicarActividad } from "../controllers/actividades";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/:id",checkJwt,getActividadesCurso);
router.post("/",checkJwt,insertarTarea)
router.delete("/:id",checkJwt,deleteActividadCurso);
router.put("/:id",checkJwt,updateActividad)
router.put("/duplicar/:id",checkJwt,duplicarActividad)

export{router};