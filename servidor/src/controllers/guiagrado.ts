import { Request,response,Response } from "express";
import {updateGraGuiaService,deleteGraGuiaService,insertGraGuiaService,getGraGuiaService,getGuiaPorGuia} from "../service/guiagrado";
import { handleHttp } from "../utils/error.handle";


const updateGuiaGrado=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoGrado=await updateGraGuiaService(req.body,id);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(res,'Error al Actualizar el Guia de Grado' )
    }

}

const deleteGuiaGrado=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoGrado=await deleteGraGuiaService(id);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(res,'Error al Eliminar  el Guia de Grado',e)
    }

}

const insertGuiaGrado=async(req:Request,res:Response)=>{

    try {
        const resultadoGrado=await insertGraGuiaService(req.body);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(res,'Error al Crear  el Guia de Grado',e)
    }

}
//Por mientras tengo el get
const getGuiaGrado=async(req:Request,res:Response)=>{

    try {
        const resultadoGrados=await getGraGuiaService();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }


}
const getGradoGuiaProfesor=async(req:Request,res:Response)=>{

    try {
        const {id} = req.params;
        const resultadoGuia=await getGuiaPorGuia(id);
        res.send(resultadoGuia);
    } catch (e) {
        handleHttp(res,'Error al Obtener al Grado del Guia',e)
    }


}

export{updateGuiaGrado,deleteGuiaGrado,insertGuiaGrado,getGuiaGrado,getGradoGuiaProfesor}