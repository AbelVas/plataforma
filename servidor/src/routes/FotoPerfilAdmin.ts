import { Router} from "express";
import { checkJwt } from "../middleware/session";
import { handleFileUpload } from "../utils/FotoPerfilAdmin";

const router=Router();

router.post("/profil-admin/photo",handleFileUpload,(req,res)=>{
    res.json({message: 'Archivo Subido Correctamente'})
});

export {router}