import { Router} from "express";
import { getRutas } from "../controllers/rutasAcceso";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/:id",checkJwt,getRutas);

export {router}