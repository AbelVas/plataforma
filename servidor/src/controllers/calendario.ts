import { Request,Response } from "express"
import { getActividadesPorAlumno,getActividadesPorTutor,getActividadesPorProfesor,getActividadesPorTipoExamen,getActividadesPorTipoTarea,getActividadesPorTipoForo,getActividadesCalificacionAlumno,getActividadesCalificacionAlumnoTotal} from "../service/calendario";
import { handleHttp } from "../utils/error.handle"

const getActividadesAlumno=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesPorAlumno(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getActividadesProfesor=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesPorProfesor(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getActividadesTutor=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesPorTutor(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getActividadesPorExamen=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const {al}=req.params
        const resultado=await getActividadesPorTipoExamen(id,al)
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getActividadesPorTarea=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
         const {al}=req.params
        const resultado=await getActividadesPorTipoTarea(id,al)
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getActividadesPorForo=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
         const {al}=req.params
        const resultado=await getActividadesPorTipoForo(id,al)
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getActividadesCalificacion=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
         const {al}=req.params
        const resultado=await getActividadesCalificacionAlumno(id,al)
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getActividadesCalificacionTotal=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
         const {al}=req.params
        const resultado=await getActividadesCalificacionAlumnoTotal(id,al)
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
export{getActividadesAlumno,getActividadesTutor,getActividadesProfesor,getActividadesPorExamen,getActividadesPorTarea,getActividadesPorForo,getActividadesCalificacion,getActividadesCalificacionTotal}