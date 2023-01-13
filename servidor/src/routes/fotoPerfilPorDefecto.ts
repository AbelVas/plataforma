import { Router} from "express";
import { checkJwt } from "../middleware/session";
import { obtenerImagenCategoria } from "../controllers/fotoPerfilPorDefecto";
const router = Router();

router.get("/:id", checkJwt,obtenerImagenCategoria);

export {router}