import { Router} from "express";
import { logMiddleware } from "../middleware/log";
import { getTemas, getTema, getTemaActivo, updateTema, deleteTema, insertTema } from "../controllers/temas";
import { checkJwt } from "../middleware/session";

const router=Router();


router.get("",checkJwt,getTemas);
router.get("/:id",checkJwt,getTema);
router.get("/activo/:activo",checkJwt,getTemaActivo);
router.post("/",checkJwt,insertTema);
router.put("/:id",checkJwt,updateTema);
router.delete("/:id",checkJwt,deleteTema);


export {router}