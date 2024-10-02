import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { 
    getAlmacenamientoGigasService, 
    GetAlumnosTotal, 
    GetAlumnosTotalPorSexo, 
    GetAlumnosHombres, 
    GetAlumnosMujeres, 
    GetCodigosEnUso, 
    GetCodigosEnDesuso, 
    GetContrasenaProfesorCambiada, 
    GetCantidadGradosService, 
    GetCantidadDocentesService 
} from "../service/estadistica";

// Obtener el total de alumnos
const obtenerAlumnosTotal = async (req: Request, res: Response) => {
    try {
        const resultado = await GetAlumnosTotal();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener el total de alumnos por sexo
const obtenerAlumnosTotalPorSexo = async (req: Request, res: Response) => {
    try {
        const resultado = await GetAlumnosTotalPorSexo();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener el total de alumnos hombres
const obtenerAlumnosHombres = async (req: Request, res: Response) => {
    try {
        const resultado = await GetAlumnosHombres();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener el total de alumnas mujeres
const obtenerAlumnosMujeres = async (req: Request, res: Response) => {
    try {
        const resultado = await GetAlumnosMujeres();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener el total de códigos en uso
const obtenerCodigosEnUso = async (req: Request, res: Response) => {
    try {
        const resultado = await GetCodigosEnUso();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener el total de códigos en desuso
const obtenerCodigosEnDesuso = async (req: Request, res: Response) => {
    try {
        const resultado = await GetCodigosEnDesuso();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener el número de profesores que han cambiado su contraseña
const obtenerContrasenaProfesorCambiada = async (req: Request, res: Response) => {
    try {
        const resultado = await GetContrasenaProfesorCambiada();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener el total de grados en la escuela
const GetCantidadGrados = async (req: Request, res: Response) => {
    try {
        const resultado = await GetCantidadGradosService();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener el total de docentes
const GetCantidadDocentes = async (req: Request, res: Response) => {
    try {
        const resultado = await GetCantidadDocentesService();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener el almacenamiento total en la plataforma
const getAlmacenamientoPlataformaController = async (req: Request, res: Response) => {
    try {
        const resultado = await getAlmacenamientoGigasService();
        res.status(200).send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

export {
    getAlmacenamientoPlataformaController,
    GetCantidadGrados,
    GetCantidadDocentes,
    obtenerAlumnosTotal,
    obtenerAlumnosTotalPorSexo,
    obtenerAlumnosHombres,
    obtenerAlumnosMujeres,
    obtenerCodigosEnUso,
    obtenerCodigosEnDesuso,
    obtenerContrasenaProfesorCambiada
};
