import { Request,Response } from "express"
import { notasalumnosFinalService } from "../service/cuadroFinal"
import { handleHttp } from "../utils/error.handle"

const notasalumnosCursoFinal=async(req:Request,res:Response)=>{
    try{
        const {idGrado}=req.params 
        const prueba=await notasalumnosFinalService(idGrado);
        res.send(prueba)
    }catch(e){
        handleHttp(res,'Error',e)
    }
}

export {notasalumnosCursoFinal}