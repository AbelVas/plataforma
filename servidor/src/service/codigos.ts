import { Request, response, Response } from "express";
import conexion from "../config/database";

const obtenerCodigosService=async()=>{
    const responseGet = await conexion.query('SELECT c.idCodigo,c.codigo,t.tipo,c.fecha_creado,c.activo FROM tbCodigo c INNER JOIN tbTipoCodigo t ON t.idTipoCodigo=c.idTipoCodigo Order BY t.tipo, c.codigo');
    return responseGet;
}

const obtenerCodigoService=async(codigo:string,idTipoCodigo:string)=>{
    const responseGet = await conexion.query('SELECT `idCodigo` FROM tbCodigo WHERE codigo=? and activo=1 and idTipoCodigo=?',[codigo,idTipoCodigo]);
    if(responseGet==''){
        return false
    }else{
        return responseGet
    }
}
const updateCodigoService= async(data:Request, id:string)=>{
    const responseUpdate = await conexion.query('UPDATE tbCodigo SET ? WHERE idCodigo=?', [data,id]);
    return responseUpdate;
}

const deleteCodigoService = async(id:string)=>{
    const responseDelete = await conexion.query('DELETE FROM tbCodigo WHERE idCodigo=?',[id]);
    return responseDelete;
}

const insertCodigoService = async (data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbCodigo set ?', [data]);
    return responseInsert;
}

export {obtenerCodigoService, obtenerCodigosService, updateCodigoService, deleteCodigoService, insertCodigoService}