import { Router} from "express";
import {getCodigo, getCodigos, updateCodigo, deleteCodigo, insertCodigo} from "../controllers/codigos"
import { logMiddleware } from "../middleware/log";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt,getCodigos);
router.post("/verify/",getCodigo);
router.put("/:id", checkJwt,updateCodigo);
router.delete("/:id", checkJwt,deleteCodigo);
router.post("/", checkJwt,insertCodigo);

export {router}