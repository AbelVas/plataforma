import { Router } from "express";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
import { getObtenerGuiasExistentes,getGradosSinGuias,insertGradosGuias,eliminarGradoGuia,actualizarGradoGuia } from "../controllers/gradoguiaasignacion";
const router=Router();

router.get("/existentes/",checkJwt,getObtenerGuiasExistentes);
router.get("/faltantes/",checkJwt,getGradosSinGuias);
router.delete("/eliminar/:id",checkJwt,eliminarGradoGuia)
router.post("/crear/",checkJwt,insertGradosGuias)
router.put("/editar/",checkJwt,actualizarGradoGuia)

export{router};
