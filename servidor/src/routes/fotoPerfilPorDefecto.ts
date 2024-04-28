import { Router} from "express";
import { checkJwt } from "../middleware/session";
import { getImagenesSubidasPorProfesorCursoController,actualizarPefilProfesorController,actualizarPefilAlumnoController,obtenerImagenCategoria,obtenerCategoriaImagen,obtenerImagenSubidUsuarioAlumnoController,obtenerImagenSubidUsuarioProfesorController } from "../controllers/fotoPerfilPorDefecto";
const router = Router();

router.get("/:id", checkJwt,obtenerImagenCategoria);
router.put("/profesor/:id", checkJwt,actualizarPefilProfesorController);
router.put("/alumno/:id", checkJwt,actualizarPefilAlumnoController);
router.get("/",checkJwt,obtenerCategoriaImagen)
router.get("/alumno-subida/:id",checkJwt,obtenerImagenSubidUsuarioAlumnoController)
router.get("/profesor-subida/:id",checkJwt,obtenerImagenSubidUsuarioProfesorController)
router.get("/obtener-imagenessubidascurso/:id",checkJwt,getImagenesSubidasPorProfesorCursoController)
export {router}