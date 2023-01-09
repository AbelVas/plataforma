import { Router} from "express";
import { logMiddleware } from "../middleware/log";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
import {obtenerAlumnosTotal, obtenerAlumnosTotalPorGrado,obtenerAlumnosHombres,obtenerAlumnosMujeres,obtenerCodigosEnUso,obtenerCodigosEnDesuso,obtenerContrasenaProfesorCambiada,obtenerContrasenaProfesorNoCambiada} from "../controllers/estadistica"

const router = Router();

router.get("/Alumnos-Total/",checkJwt,obtenerAlumnosTotal);
router.get("/Alumnos-Total/grados/",checkJwt,obtenerAlumnosTotalPorGrado);
router.get("/Alumnos-Hombres/",checkJwt,obtenerAlumnosHombres);
router.get("/Alumnos-Mujeres/",checkJwt,obtenerAlumnosMujeres);
router.get("/Codigos-uso/",checkJwt,obtenerCodigosEnUso);
router.get("/Codigos-desuso",checkJwt,obtenerCodigosEnDesuso);
router.get("/Profesor-Contrasena/Cambiada/",checkJwt,obtenerContrasenaProfesorCambiada);
router.get("/Profesor-Contrasena/No-Cambiada/",checkJwt,obtenerContrasenaProfesorNoCambiada);


export {router}