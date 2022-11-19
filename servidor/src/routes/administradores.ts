import { Router} from "express";
import { putAdmin,deleteAdmin,getAdmin,getAdmins,updateAdmin} from "../controllers/administradores";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.post("/admin",logMiddleware,putAdmin);
router.get("/admin/:id",checkJwt,getAdmin);
router.get("/admin",checkJwt,getAdmins);
router.put("/admin/:id",checkJwt,updateAdmin);
router.delete("/admin/:id",checkJwt,deleteAdmin)



export {router}