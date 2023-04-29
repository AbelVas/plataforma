import { Router } from "express";
import { getArchivos } from "../controllers/storage";
import { uploadMiddleware } from "../utils/handleStorage";
import { checkJwt } from "../middleware/session";
//Cambio sin nada

const router = Router();
router.post("/:id",checkJwt,uploadMiddleware.single("myfile"), (req, res) => {
    res.json("Se subió el archivo");
});

export {router}