import { Router} from "express";
import { getUnidades,getUnidad, postUnidad, deleteUnidad,updateUnidades } from "../controllers/unidades";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getUnidades);
router.get("/:id",checkJwt,getUnidad);
router.post("/",checkJwt,postUnidad);
router.put("/:id",checkJwt,updateUnidades);
router.delete("/:id",checkJwt,deleteUnidad);



export {router};