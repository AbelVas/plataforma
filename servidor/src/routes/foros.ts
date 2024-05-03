import { Router} from "express";
import { GetForo,GetForosCurso,UpdateForo,DelForo,CreateForo} from "../controllers/foros";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";
const router = Router();

router.get("/:id",checkJwt,GetForo)
router.get("/foros-curso/:id",checkJwt,GetForosCurso)
router.post("/crear-foro/",checkJwt,CreateForo)
router.put("/editar-foro/:id",checkJwt,UpdateForo)
router.delete("/del-foro/:id",checkJwt,DelForo)

export {router}