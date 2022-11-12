import { Router} from "express";
import { putAdmin,deleteAdmin } from "../controllers/registroAdmin.admin";
import { logMiddleware } from "../middleware/log";

const router=Router();

router.post("/",logMiddleware,putAdmin);
router.delete("/:id",logMiddleware,deleteAdmin);


export {router}