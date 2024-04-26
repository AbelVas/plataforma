import { Request,Response } from "express"
import { ActualizarImagenPerfilProfesor,ActualizarImagenPerfilAlumno,obtenerImagenSubidUsuarioProfesor,obtenerImagenSubidUsuarioAlumno,obtenerImagenCategoriaService,obtenerCatecoriaImagenService } from "../service/fotoPerfilPorDefecto"
import { handleHttp } from "../utils/error.handle"
import { io } from "../app"; // Importa el objeto de Socket.io

const obtenerImagenCategoria=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await obtenerImagenCategoriaService(id);
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerCategoriaImagen=async(req:Request, res:Response)=>{
    try {
        const response=await obtenerCatecoriaImagenService();
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerImagenSubidUsuarioAlumnoController=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await obtenerImagenSubidUsuarioAlumno(id);
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerImagenSubidUsuarioProfesorController=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await obtenerImagenSubidUsuarioProfesor(id);
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const actualizarPefilProfesorController=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const {ruta_imagen}=req.body
        const {subida}=req.body
        const {idRol}=req.body
        const response=await ActualizarImagenPerfilProfesor(id,ruta_imagen,subida);
        if(idRol=="1"){
            io.emit('actualizar-foto-perfil-admin',{usuario:id,idRol:idRol})
        }else if(idRol=="2"){
            io.emit('actualizar-foto-ferfil-docente',{usuario:id,idRol:idRol})
        }
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);        
    }
}
const actualizarPefilAlumnoController=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const {ruta_imagen}=req.body
        const {subida}=req.body
        const {idRol}=req.body
        const response=await ActualizarImagenPerfilAlumno(id,ruta_imagen,subida);
        io.emit('actualizar-foto-ferfil-alumno',{usuario:id,idRol:idRol})
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);        
    }
}

export {actualizarPefilProfesorController,actualizarPefilAlumnoController,obtenerImagenSubidUsuarioAlumnoController,obtenerImagenSubidUsuarioProfesorController,obtenerImagenCategoria,obtenerCategoriaImagen}