import { Router} from "express";
import { getNiveles,getNivel,updateNivel,deleteNivel,insertNivel } from "../controllers/niveles";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getNiveles);
router.get("/:id",checkJwt,getNivel);
router.post("/",checkJwt,insertNivel);
router.put("/:id",checkJwt,updateNivel);
router.delete("/:id",checkJwt,deleteNivel);

export {router}