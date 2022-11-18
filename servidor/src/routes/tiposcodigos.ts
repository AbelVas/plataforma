import { Router} from "express";
import {getTipoCodigo, getTiposCodigos, upadteTipoCodigo, deletetipocodigo, insertartipoCodigo} from "../controllers/tiposcodigos"
import { logMiddleware } from "../middleware/log";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/",checkJwt,getTiposCodigos);
router.get("/:id", checkJwt,getTipoCodigo);
router.put("/:id", checkJwt, upadteTipoCodigo);
router.delete("/:id", checkJwt, deletetipocodigo);
router.post("/", checkJwt, insertartipoCodigo);

export {router}