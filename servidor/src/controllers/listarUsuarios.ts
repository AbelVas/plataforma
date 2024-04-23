import { Request,Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { obtenerAlumnosService,obtenerAlumnoService,obtenerProfesoresService,obtenerProfesorService,obtenerAdminsService,obtenerAdminService} from "../service/listarUsuarios";

const getAdmin=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoUnidades=await obtenerAdminService(id);
        res.send(resultadoUnidades);
     }catch(e){
        handleHttp(e, req, res);
     }
}
const getAdmins=async(req:Request,res:Response)=>{
    try{
        const resultadoUnidades=await obtenerAdminsService();
        res.send(resultadoUnidades);
     }catch(e){
        handleHttp(e, req, res);
     }
}

const getProfesor=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoUnidades=await obtenerProfesorService(id);
        res.send(resultadoUnidades);
     }catch(e){
        handleHttp(e, req, res);
     }
}
const getProfesores=async(req:Request,res:Response)=>{
    try{
        const resultadoUnidades=await obtenerProfesoresService();
        res.send(resultadoUnidades);
     }catch(e){
        handleHttp(e, req, res);
     }
}

const getAlumno=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoUnidades=await obtenerAlumnoService(id);
        res.send(resultadoUnidades);
     }catch(e){
        handleHttp(e, req, res);
     }
}
const getAlumnos=async(req:Request,res:Response)=>{
    try{
        const resultadoUnidades=await obtenerAlumnosService();
        res.send(resultadoUnidades);
     }catch(e){
        handleHttp(e, req, res);
     }
}
export {getAdmin,getAdmins,getProfesor,getProfesores,getAlumno,getAlumnos}