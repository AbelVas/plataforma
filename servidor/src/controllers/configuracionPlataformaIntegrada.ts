import { Request,Response } from "express"
import { getConfiguracionesService,getExtensionesImagenesService,getExtensionesDocumentosService } from "../service/configuracionPlataformaIntegrada"
import { handleHttp } from "../utils/error.handle";

const getConfiguracionesController=async (req:Request, res:Response)=>{
    try {
        const resultado=await getConfiguracionesService();
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getExtensionesImagenes=async(req:Request,res:Response)=>{
    try {
        const resultado=await getExtensionesImagenesService();
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getExtensionesDocumentos=async(req:Request,res:Response)=>{
    try {
        const resultado=await getExtensionesDocumentosService();
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export {getConfiguracionesController,getExtensionesImagenes,getExtensionesDocumentos}