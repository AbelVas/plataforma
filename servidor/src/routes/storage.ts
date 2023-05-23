import { Router } from "express";
import { getArchivos } from "../controllers/storage";
import { uploadMiddleware } from "../utils/handleStorage";
import { checkJwt } from "../middleware/session";
//Cambio sin nada

const router = Router();
router.post('/upload/:id',uploadMiddleware.single("myFile"),(req,res)=>{
    console.log(req.file);
    res.send('Ok')
});

export {router}