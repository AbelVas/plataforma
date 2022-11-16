import { Router} from "express";
import { getJornadas,getJornada,updateJornada,deleteJornada,insertarJornada } from "../controllers/jornadas";
import { logMiddleware } from "../middleware/log";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,checkRol(['1','2']),getJornadas);
router.get("/:id",checkJwt,checkRol(['1','2']),getJornada);
router.post("/",checkJwt,checkRol(['1']),insertarJornada);
router.put("/:id",checkJwt,checkRol(['1']),updateJornada);
router.delete("/:id",checkJwt,checkRol(['1']),deleteJornada);

export {router};