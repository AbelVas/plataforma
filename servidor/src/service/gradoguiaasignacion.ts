import { Request, response, Response } from "express";
import conexion from "../config/database";

const obtenerGuiasExistente=async()=>{
    const getDatosGuiasExistentes=await conexion.query("SELECT gg.idGuias,g.idGrado,CONCAT(g.nombre_grado,', ',s.seccion,', ',n.nivel,', ',j.jornada) AS Grado,gg.idProfesor,concat(p.apellido_profesor,', ',p.nombre_profesor) AS profesor FROM tbGrado g LEFT JOIN tbGuiaGrado gg ON g.idGrado=gg.idGrado LEFT JOIN tbProfesor p ON gg.idProfesor=p.idProfesor LEFT JOIN tbSeccion s ON s.idSeccion=g.idSeccion LEFT JOIN tbNivel n ON n.idNivel=g.idNivel LEFT JOIN tbJornada j ON j.idJornada=n.idJornada WHERE gg.idGrado IS NOT NULL ORDER BY g.idGrado")
    return getDatosGuiasExistentes;
}
const obtenerGradosSinGuias=async()=>{
    const getGradosSinGuias=await conexion.query("SELECT gg.idGuias,g.idGrado,CONCAT(g.nombre_grado,', ',s.seccion,', ',n.nivel,', ',j.jornada) AS Grado,gg.idProfesor,concat(p.apellido_profesor,', ',p.nombre_profesor) AS profesor FROM tbGrado g LEFT JOIN tbGuiaGrado gg ON g.idGrado=gg.idGrado LEFT JOIN tbProfesor p ON gg.idProfesor=p.idProfesor LEFT JOIN tbSeccion s ON s.idSeccion=g.idSeccion LEFT JOIN tbNivel n ON n.idNivel=g.idNivel LEFT JOIN tbJornada j ON j.idJornada=n.idJornada WHERE gg.idGrado IS NULL ORDER BY g.idGrado")
    return getGradosSinGuias
}
const insertarGradoGuia=async(idProfesor:string,idGrado:string)=>{
    const createGradoGuia=await conexion.query("INSERT INTO tbGuiaGrado set idProfesor=?, idGrado=?",[idProfesor,idGrado]);
    return true
}
const deleteGradoGuia=async(idGuias:string)=>{
    const deleteGradoGuia=await conexion.query("DELETE FROM tbGuiaGrado WHERE idGuias=?",[idGuias]);
    return true
}
const updateGradoGuia=async(data:any,idGuias:string)=>{
    const updateGradoGuia=await conexion.query("UPDATE tbGuiaGrado SET ? WHERE idGuias=?",[data,idGuias]);
    return true
}

export {obtenerGuiasExistente,obtenerGradosSinGuias,insertarGradoGuia,deleteGradoGuia,updateGradoGuia}