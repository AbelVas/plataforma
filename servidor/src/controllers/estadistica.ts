import { Request,Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { getAlmacenamientoGigasService,GetAlumnosTotal,GetAlumnosTotalPorGrado,GetAlumnosHombres,GetAlumnosMujeres,GetCodigosEnUso, GetCodigosEnDesuso,GetContrasenaProfesorCambiada,GetCantidadGradosService,GetCantidadDocentesService} from  "../service/estadistica"

const obtenerAlumnosTotal=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetAlumnosTotal();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerAlumnosTotalPorGrado=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetAlumnosTotalPorGrado();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerAlumnosHombres=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetAlumnosHombres();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerAlumnosMujeres=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetAlumnosMujeres();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerCodigosEnUso=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetCodigosEnUso();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerCodigosEnDesuso=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetCodigosEnDesuso();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerContrasenaProfesorCambiada=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetContrasenaProfesorCambiada();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const GetCantidadGrados=async(req:Request,res:Response)=>{
    try {
        const resultado=await GetCantidadGradosService()
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const GetCantidadDocentes=async(req:Request,res:Response)=>{
    try {
        const resultado=await GetCantidadDocentesService()
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getAlmacenamientoPlataformaController=async(req:Request,res:Response)=>{
    try {
        const resultado=await getAlmacenamientoGigasService()
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export{getAlmacenamientoPlataformaController,GetCantidadGrados,GetCantidadDocentes,obtenerAlumnosTotal, obtenerAlumnosTotalPorGrado,obtenerAlumnosHombres,obtenerAlumnosMujeres,obtenerCodigosEnUso,obtenerCodigosEnDesuso,obtenerContrasenaProfesorCambiada}