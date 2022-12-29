import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { getTipoActividad} from "../controllers/tipoActividad";

const router=Router();

router.get("/",checkJwt,getTipoActividad);

export{router};