import { Request, Response } from "express";
import conexion from "../config/database";
// Mi primer Appi Queza

const GetGradosService=async()=>{

    const responseGet=await conexion.query('SELECT `idGrado`, `idSeccion`, `nombre_grado`, `estatus` FROM tbGrado');
    return responseGet;
}
const GetGradoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT `idGrado`, `idSeccion`, `nombre_grado`, `estatus` FROM tbGrado WHERE idGrado=?',[id]);
    return responseGet;
}
const updateGradoService=async(data:Request,id:string)=>{
   
    const responseUpdate=await conexion.query('UPDATE tbGrado SET ? WHERE idGrado=?',[data,id]);
    return responseUpdate;

}
const deleteGradoService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbGrado WHERE idGrado=?',[id]);
    return responseDelete;
}
const insertGradoService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbGrado set ?',[data]);
    return responseInsert;
}
const getGradoNivelService=async(idNivel:string)=>{
    const responseGetNivel=await conexion.query('SELECT `idGrado`, `idNivel`, `idSeccion`, `nombre_grado`, `estatus` FROM tbGrado WHERE idNivel=?',[idNivel]);
    return responseGetNivel;
}
const getGradoxJornada=async(id:string)=>{
    const responseGradoJornada=await conexion.query('SELECT g.idGrado,g.nombre_grado,s.seccion,n.nivel,g.estatus FROM ((tbGrado g INNER JOIN tbNivel n ON n.idNivel=g.idNivel)INNER JOIN tbJornada j ON j.idJornada=n.idJornada)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion WHERE j.idJornada=? group by g.nombre_grado',[id])
    return responseGradoJornada;
}
export{GetGradosService,GetGradoService,updateGradoService,deleteGradoService,insertGradoService, getGradoNivelService,getGradoxJornada}