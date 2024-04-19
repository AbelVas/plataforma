import { Request,Response } from "express"
import { handleHttp } from "../utils/error.handle"
import {actualizaraPerfilAdminService,actualizaraPerfilTutorService,actualizaraPerfilAlumnoService,actualizaraPerfilProfesorService} from "../service/uploadPerfil"

const actualizaraPerfilAdmin=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await actualizaraPerfilAdminService(id,req.body);
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const actualizaraPerfilTutor=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await actualizaraPerfilTutorService(id,req.body);
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const actualizaraPerfilAlumno=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await actualizaraPerfilAlumnoService(id,req.body);
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const actualizaraPerfilProfesor=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await actualizaraPerfilProfesorService(id,req.body);
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);
    }
}


export {actualizaraPerfilAdmin,actualizaraPerfilTutor,actualizaraPerfilAlumno,actualizaraPerfilProfesor}