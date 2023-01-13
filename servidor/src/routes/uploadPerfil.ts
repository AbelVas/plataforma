import { Router} from "express";
import { checkJwt } from "../middleware/session";
import { actualizaraPerfilAdmin,actualizaraPerfilTutor,actualizaraPerfilAlumno,actualizaraPerfilProfesor} from "../controllers/uploadPerfil";

const router = Router();

router.post("/admin/:id", checkJwt,actualizaraPerfilAdmin);
router.post("/profesor/:id", checkJwt,actualizaraPerfilProfesor);
router.post("/alumno/:id", checkJwt,actualizaraPerfilAlumno);
router.post("/tutor/:id", checkJwt,actualizaraPerfilTutor);

export {router}