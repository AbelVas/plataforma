import { Router} from "express";
import { getJornadas,getJornada,updateJornada,deleteJornada,insertarJornada } from "../controllers/jornadas";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getJornadas);
router.get("/:id",checkJwt,getJornada);
router.post("/",checkJwt,insertarJornada);
router.put("/:id",checkJwt,updateJornada);
router.delete("/:id",checkJwt,deleteJornada);



export {router};