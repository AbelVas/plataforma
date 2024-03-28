import { Router} from "express";
import { getNiveles,getNivel,updateNivel,deleteNivel,insertNivel,getNivelesporJornada} from "../controllers/niveles";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getNiveles);
router.get("/:id",checkJwt,getNivel);
router.post("/:idUsuario/:nombre",checkJwt,insertNivel);
router.put("/:id/:idUsuario/:nombre",checkJwt,updateNivel);
router.delete("/:id/:idUsuario/:nombre",checkJwt,deleteNivel);
router.get("/nivel-jornada/:id", checkJwt, getNivelesporJornada)

export {router}