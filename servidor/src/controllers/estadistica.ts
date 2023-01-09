import { Request,Response } from "express"
import { handleHttp } from "../utils/error.handle"
import {GetAlumnosTotal,GetAlumnosTotalPorGrado,GetAlumnosHombres,GetAlumnosMujeres,GetCodigosEnUso, GetCodigosEnDesuso,GetContrasenaProfesorCambiada,GetContrasenaProfesorNoCambiada} from  "../service/estadistica"

const obtenerAlumnosTotal=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetAlumnosTotal();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
const obtenerAlumnosTotalPorGrado=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetAlumnosTotalPorGrado();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
const obtenerAlumnosHombres=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetAlumnosHombres();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
const obtenerAlumnosMujeres=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetAlumnosMujeres();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
const obtenerCodigosEnUso=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetCodigosEnUso();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
const obtenerCodigosEnDesuso=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetCodigosEnDesuso();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
const obtenerContrasenaProfesorCambiada=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetContrasenaProfesorCambiada();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
const obtenerContrasenaProfesorNoCambiada=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetContrasenaProfesorNoCambiada();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}

export{obtenerAlumnosTotal, obtenerAlumnosTotalPorGrado,obtenerAlumnosHombres,obtenerAlumnosMujeres,obtenerCodigosEnUso,obtenerCodigosEnDesuso,obtenerContrasenaProfesorCambiada,obtenerContrasenaProfesorNoCambiada}