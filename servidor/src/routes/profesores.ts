import { Router } from "express";
import { fotoPerfilProfeController,getFotoPerfilActivaProfesor,getProfesores,getProfesor,updateProfesor,deleteProfesor,insertarProfesor,compararPass,getGradoGuiaProfesor,getFotoCursoActivaProfesor} from "../controllers/profesores";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/profesor/",checkJwt,getProfesores);
router.get("/profesor/:id",checkJwt,getProfesor);
router.get("/gradoguia/:id",checkJwt,getGradoGuiaProfesor);
router.post("/profesor/",logMiddleware,insertarProfesor);
router.put("/profesor/:id",checkJwt,updateProfesor);
router.delete("/profesor/:id",checkJwt,deleteProfesor);
router.post("/profesor/pass/:id",checkJwt,compararPass);
router.get("/profesor-foto-perfil/:id",checkJwt,getFotoPerfilActivaProfesor)
router.put("/profesor-foto-perfil",checkJwt,fotoPerfilProfeController)
router.put("/profesor-foto-curso",checkJwt,fotoPerfilProfeController)
router.get("/profesor-foto-curso/:id",checkJwt,getFotoCursoActivaProfesor)


export {router};