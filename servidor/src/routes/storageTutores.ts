import { Router } from "express";
import { getArchivosTutores,getArchivoTutor,updateArchivoTutores,deleteArchivoTutores,insertArchivoTutores } from "../controllers/storageTutores";
import { uploadMiddleware } from "../utils/handleStorage";
import { checkJwt } from "../middleware/session";


const router = Router();
router.post("/:nombre",checkJwt,uploadMiddleware.single("myfile"), (req, res) => {
    res.json("Se subió el archivo");
});

export {router}