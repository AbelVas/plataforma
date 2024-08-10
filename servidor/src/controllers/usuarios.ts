import { Request,Response } from "express";
import {getFotoPerfilAlumnoService,fotoPerfilAlumnoService,getNotasVerService,verNotasAlumnosService,insertAlumnosService,obtenerAlumnosService,obtenerAlumnosGradoService,obtenerAlumnoService,updateAlumnosService,deleteAlumnoService,validarAlumnosExisteSi,verifyPassword,
    UpdateStatusAlumnos,UpdateStatusProfesor,UpdateStatusTutores,getEstadoAlumno,getEstadoProfesor,getEstadoTutor,getTutorporAlumno} from "../service/usuarios";
import { handleHttp } from "../utils/error.handle";
import { encrypt } from "../utils/passwordFunction";
import { io } from "../app"; // Importa el objeto de Socket.io

const getAlumnos=async(req:Request,res:Response)=>{
    try{
        const resultadoAlumno=await obtenerAlumnosService();
        res.send(resultadoAlumno);
    }catch(e){
        handleHttp(e, req, res);
    }
}
const getAlumno= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoAlumno=await obtenerAlumnoService(id);
       res.send(resultadoAlumno);
    }catch(e){
        handleHttp(e, req, res);
    }
}
const getAlumnosGrado= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoAlumnosGrado=await obtenerAlumnosGradoService(id);
       res.send(resultadoAlumnosGrado);
    }catch(e){
        handleHttp(e, req, res);
    }
}

const updateAlumno= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const {pass}=req.body
        if(pass==null){
            const resultado=await updateAlumnosService(req.body,id);
            res.send(resultado);
        }else{
            const passEncrypt=await encrypt(req.body.pass);
            req.body.pass=passEncrypt
            const resultadoAlumno=await updateAlumnosService(req.body,id);
            res.send(resultadoAlumno);
        }
    }catch(e){
        handleHttp(e, req, res);
    }
}
const deleteAlumno= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoAlumno=await deleteAlumnoService(id);
       res.send(resultadoAlumno);
    }catch(e){
        handleHttp(e, req, res);
    }
}
const insertarAlumno= async(req:Request,res:Response)=>{
    try{
        const validar=await validarAlumnosExisteSi(req.body.usuario);
        if(validar!=''){
            res.send("Error, Alumno ya existe")
        }else{
            const passEncrypt=await encrypt(req.body.pass);
            req.body.pass=passEncrypt
            const resultadoAlumno=await insertAlumnosService(req.body);
            res.send(resultadoAlumno);
        }
    }catch(e){
        handleHttp(e, req, res);
    }
}

const compararPass=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {pass}=req.body;
        const resultadoDelete=await verifyPassword(id,pass);
        res.send(resultadoDelete);
     }catch(e){
        handleHttp(e, req, res);
     }
}
const verNotasAlumnos=async(req:Request,res:Response)=>{
    const {id}=req.params
    try {
        const accion=await verNotasAlumnosService(id);
        res.send(accion)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getNotasVer=async(req:Request,res:Response)=>{
    try {
        const accion=await getNotasVerService();
        res.send(accion)
    } catch (e) {
        handleHttp(e, req, res);
    }

}
const ObtEstadoAlumno=async(req:Request,res:Response)=>{
    try {
        const accion=await getEstadoAlumno();
        res.send(accion)
    } catch (e) {
        handleHttp(e, req, res);
    }

}
const ObtEstadoProfesor=async(req:Request,res:Response)=>{
    try {
        const accion=await getEstadoProfesor();
        res.send(accion)
    } catch (e) {
        handleHttp(e, req, res);
    }

}
const ObtEstadoTutor=async(req:Request,res:Response)=>{
    try {
        const accion=await getEstadoTutor();
        res.send(accion)
    } catch (e) {
        handleHttp(e, req, res);
    }

}

const updateEstadoAlumno=async(req:Request,res:Response)=>{
    const {id}=req.params
    try {
        const accion=await UpdateStatusAlumnos(id);
        res.send(accion)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const updateEstadoProfesor=async(req:Request,res:Response)=>{
    const {id}=req.params
    try {
        const accion=await UpdateStatusProfesor(id);
        res.send(accion)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const updateEstadoTutor=async(req:Request,res:Response)=>{
    const {id}=req.params
    try {
        const accion=await UpdateStatusTutores(id);
        res.send(accion)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const fotoPerfilAlumnoController=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const {ruta_imagen}=req.body;
        const {idAlumno}=req.body;
        const {peso_archivo}=req.body
        const {subida}=req.body
        const {idRol}=req.body
        const fotoPerfilAlumno=await fotoPerfilAlumnoService(idAlumno,ruta_imagen,peso_archivo,subida)
        io.emit('actualizar-foto-ferfil-alumno',{usuario:idAlumno,idRol:idRol})
        res.send(fotoPerfilAlumno)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getFotoPerfilActivaAlumno=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const consulta=await getFotoPerfilAlumnoService(id)
        res.send(consulta)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getTutorporAlumnoControl=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const consulta=await getTutorporAlumno(id)
        res.send(consulta)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export {getFotoPerfilActivaAlumno,fotoPerfilAlumnoController,getAlumnos,getAlumno,getAlumnosGrado,updateAlumno,deleteAlumno,insertarAlumno,compararPass,verNotasAlumnos,getNotasVer,
    ObtEstadoAlumno,ObtEstadoProfesor,ObtEstadoTutor,updateEstadoAlumno,updateEstadoProfesor,updateEstadoTutor,getTutorporAlumnoControl}