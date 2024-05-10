import { Router} from "express";
import { getConfiguracionesController } from "../controllers/configuracionPlataformaIntegrada";


const router = Router();

router.get("/",getConfiguracionesController)

export {router}