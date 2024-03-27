import { getArchivos } from "../controllers/storage";
import { uploadMiddleware } from "../utils/handleStorage";
import { checkJwt } from "../middleware/session";
import { Router } from "express";


const router = Router();
router.post("/:nombre",checkJwt,uploadMiddleware.single("myfile"), (req, res) => {
    res.json("Se subió el archivo");
});

export {router}