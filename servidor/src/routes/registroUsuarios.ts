import { Router} from "express";
import { putAdmin,deleteAdmin } from "../controllers/registroUsuarios";
import { logMiddleware } from "../middleware/log";

const router=Router();

router.post("/admin",logMiddleware,putAdmin);
router.post("/profesores")
router.post("/alumnos")


export {router}