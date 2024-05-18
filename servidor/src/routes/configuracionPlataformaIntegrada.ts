import { Router} from "express";
import { getConfiguracionesController,getExtensionesImagenes,getExtensionesDocumentos } from "../controllers/configuracionPlataformaIntegrada";


const router = Router();

router.get("/",getConfiguracionesController)
router.get("/ext-imagenes",getExtensionesImagenes)
router.get("/ext-docs",getExtensionesDocumentos)

export {router}