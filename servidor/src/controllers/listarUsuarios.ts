import { Request,Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { obtenerAlumnosService,obtenerAlumnoService,obtenerProfesoresService,obtenerProfesorService,obtenerAdminsService,obtenerAdminService} from "../service/listarUsuarios";

const getAdmin=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoUnidades=await obtenerAdminService(id);
        res.send(resultadoUnidades);
     }catch(e){
         handleHttp(res,'Error al Obtener Dato')
     }
}
const getAdmins=async(req:Request,res:Response)=>{
    try{
        const resultadoUnidades=await obtenerAdminsService();
        res.send(resultadoUnidades);
     }catch(e){
         handleHttp(res,'Error al Obtener Dato')
     }
}

const getProfesor=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoUnidades=await obtenerProfesorService(id);
        res.send(resultadoUnidades);
     }catch(e){
         handleHttp(res,'Error al Obtener Dato')
     }
}
const getProfesores=async(req:Request,res:Response)=>{
    try{
        const resultadoUnidades=await obtenerProfesoresService();
        res.send(resultadoUnidades);
     }catch(e){
         handleHttp(res,'Error al Obtener Dato')
     }
}

const getAlumno=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoUnidades=await obtenerAlumnoService(id);
        res.send(resultadoUnidades);
     }catch(e){
         handleHttp(res,'Error al Obtener Dato')
     }
}
const getAlumnos=async(req:Request,res:Response)=>{
    try{
        const resultadoUnidades=await obtenerAlumnosService();
        res.send(resultadoUnidades);
     }catch(e){
         handleHttp(res,'Error al Obtener Dato')
     }
}
export {getAdmin,getAdmins,getProfesor,getProfesores,getAlumno,getAlumnos}