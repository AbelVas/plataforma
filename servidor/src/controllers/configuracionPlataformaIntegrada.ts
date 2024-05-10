import { Request,Response } from "express"
import { getConfiguracionesService } from "../service/configuracionPlataformaIntegrada"
import { handleHttp } from "../utils/error.handle";

const getConfiguracionesController=async (req:Request, res:Response)=>{
    try {
        const resultado=await getConfiguracionesService();
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export {getConfiguracionesController}