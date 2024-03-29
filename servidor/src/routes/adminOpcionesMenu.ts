import { Router } from "express";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";
import { getSideBarOpcionAdmin } from "../controllers/adminOpcionesMenu";

const router=Router();

router.get('/',checkJwt,getSideBarOpcionAdmin)

export {router};