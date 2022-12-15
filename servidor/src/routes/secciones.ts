import { Router} from "express";
import { logMiddleware } from "../middleware/log";
import {getSecciones,getSeccion,updateSeccion,deleteSeccion,insertSeccion} from '../controllers/secciones'
import { checkJwt } from "../middleware/session";

const router=Router();


router.get("",checkJwt,getSecciones);
router.get("/:id",checkJwt,getSeccion);
router.post("/",checkJwt,insertSeccion);
router.put("/:id",checkJwt,updateSeccion);
router.delete("/:id",checkJwt,deleteSeccion);


export {router}