import { Router } from "express";
import { getArchivosAlumnos,getArchivoAlumno,updateArchivoAlumno,deleteArchivoAlumno,insertArchivoAlumno } from "../controllers/storageAlumnos";
import { uploadMiddleware } from "../utils/handleStorage";
import { checkJwt } from "../middleware/session";


const router = Router();
router.post("/:nombre",checkJwt,uploadMiddleware.single("myfile"), (req, res) => {
    res.json("Se subió el archivo");
});

export {router}