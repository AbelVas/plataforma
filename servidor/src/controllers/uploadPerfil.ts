import { Request,Response } from "express"
import { handleHttp } from "../utils/error.handle"
import {actualizaraPerfilAdminService,actualizaraPerfilTutorService,actualizaraPerfilAlumnoService,actualizaraPerfilProfesorService} from "../service/uploadPerfil"

const actualizaraPerfilAdmin=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await actualizaraPerfilAdminService(id,req.body);
        res.send(response)
    } catch (e) {
        handleHttp(res,'Error al Actualizar Foto de Perfil Admin',e)
        console.log(e)
    }
}
const actualizaraPerfilTutor=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await actualizaraPerfilTutorService(id,req.body);
        res.send(response)
    } catch (e) {
        handleHttp(res,'Error al Actualizar Foto de Perfil Tutor',e)
        console.log(e)
    }
}
const actualizaraPerfilAlumno=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await actualizaraPerfilAlumnoService(id,req.body);
        res.send(response)
    } catch (e) {
        handleHttp(res,'Error al Actualizar Foto de Perfil Alumno',e)
        console.log(e)
    }
}
const actualizaraPerfilProfesor=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await actualizaraPerfilProfesorService(id,req.body);
        res.send(response)
    } catch (e) {
        handleHttp(res,'Error al Actualizar Foto de Perfil Docente',e)
        console.log(e)
    }
}


export {actualizaraPerfilAdmin,actualizaraPerfilTutor,actualizaraPerfilAlumno,actualizaraPerfilProfesor}