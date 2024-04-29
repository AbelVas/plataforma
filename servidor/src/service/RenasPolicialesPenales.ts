import { Request, Response } from "express";
import conexion from "../config/database";

const obtenerRenasService=async(idProfesor:string,nombre:string)=>{
    const consulta=await conexion.query("SELECT ruta_archivo FROM tbRenasPenalesPoliciales WHERE idProfesor=? and nombre=?",[idProfesor,nombre])
    return consulta
}
const obtenerAntecedentesPenalesService=async(idProfesor:string,nombre:string)=>{
    const consulta=await conexion.query("SELECT ruta_archivo FROM tbRenasPenalesPoliciales WHERE idProfesor=? and nombre=?",[idProfesor,nombre])
    return consulta

}
const obtenerAntecedentesPoliciacosService=async(idProfesor:string,nombre:string)=>{
    const consulta=await conexion.query("SELECT ruta_archivo FROM tbRenasPenalesPoliciales WHERE idProfesor=? and nombre=?",[idProfesor,nombre])
    return consulta
}

const insertarRenasService=async(idProfesor:string,nombre:string,peso_archivo:string,ruta_archivo:string)=>{
    const consulta=await conexion.query("INSERT INTO tbRenasPenalesPoliciales(idProfesor,nombre,peso_archivo,ruta_archivo) values(?,?,?,?)",[idProfesor,nombre,peso_archivo,ruta_archivo])
    return consulta

}
const insertarAPoliciacosService=async(idProfesor:string,nombre:string,peso_archivo:string,ruta_archivo:string)=>{
    const consulta=await conexion.query("INSERT INTO tbRenasPenalesPoliciales(idProfesor,nombre,peso_archivo,ruta_archivo) values(?,?,?,?)",[idProfesor,nombre,peso_archivo,ruta_archivo])
    return consulta

}
const insertarAPenalesService=async(idProfesor:string,nombre:string,peso_archivo:string,ruta_archivo:string)=>{
    const consulta=await conexion.query("INSERT INTO tbRenasPenalesPoliciales(idProfesor,nombre,peso_archivo,ruta_archivo) values(?,?,?,?)",[idProfesor,nombre,peso_archivo,ruta_archivo])
    return consulta

}
export {insertarAPenalesService,insertarAPoliciacosService,insertarRenasService,obtenerRenasService,obtenerAntecedentesPenalesService,obtenerAntecedentesPoliciacosService}