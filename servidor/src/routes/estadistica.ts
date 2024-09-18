import { Router} from "express";
import { logMiddleware } from "../middleware/log";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
import { getAlmacenamientoPlataformaController,obtenerAlumnosTotal,obtenerAlumnosHombres,obtenerAlumnosMujeres,obtenerCodigosEnUso,obtenerCodigosEnDesuso,obtenerContrasenaProfesorCambiada,GetCantidadGrados,GetCantidadDocentes} from "../controllers/estadistica"

const router = Router();

router.get("/Alumnos-Total/",checkJwt,obtenerAlumnosTotal);
//router.get("/Alumnos-Total/grados/",checkJwt,obtenerAlumnosTotalPorGrado);
router.get("/Alumnos-Hombres/",checkJwt,obtenerAlumnosHombres);
router.get("/Alumnos-Mujeres/",checkJwt,obtenerAlumnosMujeres);
router.get("/Codigos-uso/",checkJwt,obtenerCodigosEnUso);
router.get("/Codigos-desuso",checkJwt,obtenerCodigosEnDesuso);
router.get("/Profesor-Contrasena/Cambiada/",checkJwt,obtenerContrasenaProfesorCambiada);
router.get("/CantidadGrados",checkJwt,GetCantidadGrados)
router.get("/Cantidad-docentes",checkJwt,GetCantidadDocentes)
router.get("/almacenamiento",checkJwt,getAlmacenamientoPlataformaController)

export {router}