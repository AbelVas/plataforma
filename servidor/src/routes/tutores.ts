import { Router } from "express";
import { getTutores,getTutor,updateTutor,deleteTutor,insertarTutor } from "../controllers/tutores";
import { logMiddleware } from "../middleware/log";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
 
const router=Router();

router.get("/",checkJwt,getTutores);
router.get("/:id",checkJwt,getTutor);
router.post("/",checkJwt,insertarTutor);
router.put("/:id",checkJwt,updateTutor);
router.delete("/:id",checkJwt,deleteTutor);


export {router};