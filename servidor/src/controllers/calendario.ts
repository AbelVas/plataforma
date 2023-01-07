import { Request,Response } from "express"
import { getActividadesPorAlumno,getActividadesPorTutor,getActividadesPorProfesor,getActividadesPorTipoExamen,getActividadesPorTipoTarea,getActividadesPorTipoForo} from "../service/calendario";
import { handleHttp } from "../utils/error.handle"

const getActividadesAlumno=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesPorAlumno(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Obtener las actividades del Curso',e)
    }
}

const getActividadesTutor=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesPorTutor(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Obtener las actividades del Curso',e)
    }
}

const getActividadesProfesor=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesPorProfesor(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Obtener las actividades del Curso',e)
    }
}

const getActividadesPorExamen=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesPorTipoExamen(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Obtener las actividades del Curso',e)
    }
}

const getActividadesPorTarea=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesPorTipoTarea(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Obtener las actividades del Curso',e)
    }
}

const getActividadesPorForo=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesPorTipoForo(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Obtener las actividades del Curso',e)
    }
}


export{getActividadesAlumno,getActividadesTutor,getActividadesProfesor,getActividadesPorExamen,getActividadesPorTarea,getActividadesPorForo}