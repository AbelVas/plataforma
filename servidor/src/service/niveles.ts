import { Request, Response } from "express";
import conexion from "../config/database";

const insertNivelService=async(data:Request)=>{
    const response=await conexion.query("INSERT INTO tbNivel set ?",[data]);
    return response;
}
const obtenerNivelesService=async()=>{
    const response=await conexion.query("SELECT n.idNivel,j.idJornada,j.jornada,n.nivel FROM tbNivel n INNER JOIN tbJornada j on j.idJornada=n.idJornada");
    return response;
}
const obtenerNivelService=async(id:string)=>{
    const response=await conexion.query("SELECT n.idNivel,j.idJornada,j.jornada,n.nivel FROM tbNivel n INNER JOIN tbJornada j on j.idJornada=n.idJornada WHERE n.idNivel=?",[id]);
    return response;
}
const eliminarNivelService=async(id:string)=>{
    const response=await conexion.query("DELETE FROM tbNivel WHERE idNivel=?",[id]);
    return response;
}
const editarNivelService=async(data:Request,id:string)=>{
    const response=await conexion.query("UPDATE tbNivel SET ? WHERE idNivel=?",[data,id]);
    return response;
}

const getNivelesporJornadaService=async(idJornada:string)=>{
    const response=await conexion.query("SELECT n.idNivel,j.idJornada,j.jornada,n.nivel FROM tbNivel n INNER JOIN tbJornada j on j.idJornada=n.idJornada WHERE j.idJornada = ?", [idJornada]);
    return response;
}

export {insertNivelService,obtenerNivelesService,obtenerNivelService,eliminarNivelService,editarNivelService,getNivelesporJornadaService}
