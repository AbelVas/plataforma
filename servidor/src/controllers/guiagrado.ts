import { Request,response,Response } from "express";
import {updateGraGuiaService,deleteGraGuiaService,insertGraGuiaService,getGraGuiaService,getGuiaPorGuia} from "../service/guiagrado";
import { handleHttp } from "../utils/error.handle";


const updateGuiaGrado=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoGrado=await updateGraGuiaService(req.body,id);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(e, req, res);
    }

}

const deleteGuiaGrado=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoGrado=await deleteGraGuiaService(id);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(e, req, res);
    }

}

const insertGuiaGrado=async(req:Request,res:Response)=>{

    try {
        const resultadoGrado=await insertGraGuiaService(req.body);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(e, req, res);
    }

}
//Por mientras tengo el get
const getGuiaGrado=async(req:Request,res:Response)=>{

    try {
        const resultadoGrados=await getGraGuiaService();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }


}
const getGradoGuiaProfesor=async(req:Request,res:Response)=>{

    try {
        const {id} = req.params;
        const resultadoGuia=await getGuiaPorGuia(id);
        res.send(resultadoGuia);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

export{updateGuiaGrado,deleteGuiaGrado,insertGuiaGrado,getGuiaGrado,getGradoGuiaProfesor}