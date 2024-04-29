import { Router} from "express";
import { checkJwt } from "../middleware/session";
import { insertarAPenalesController,insertarAPoliciacosController, insertarRenasController,obtenerRenasController,obtenerAntecedentesPenalesController,obtenerAntecedentesPoliciacosController } from '../controllers/RenasPolicialesPenales'

const router = Router();

router.get("/renas/:id",checkJwt,obtenerRenasController)
router.get("/apenales/:id",checkJwt,obtenerAntecedentesPenalesController)
router.get("/apoliciacos/:id",checkJwt,obtenerAntecedentesPoliciacosController)
router.put("/renas/:id")//update
router.put("/apenales/:id")//update
router.put("/apoliciacos/:id")//update
router.post("/renas/:id",checkJwt,insertarRenasController)//insert
router.post("/apenales/:id",checkJwt,insertarAPenalesController)//insert
router.post("/apoliciacos/:id",checkJwt,insertarAPoliciacosController)//insert
router.delete("/renas/:id")
router.delete("/apenales/:id")
router.delete("/apoliciacos/:id")

export {router}