import { Request, Response } from "express";
import conexion from "../config/database";

const getTipoActividadService=async()=>{
    var TipoActi:any=[];
    const response=await conexion.query('SELECT idTipoActividad,tipoActividad,ruta_icono_activo,ruta_icono_inactivo,estado,modal FROM tbTipoActividad');
    const cantidadElementos=response.length;
    //const datosTipoActividad:any=Object.values(response[0])
    for(let i=0;i<cantidadElementos;i++){
        if(response[i].estado==1){
            TipoActi[i]={
                idTipoActividad:response[i].idTipoActividad,
                tipoActividad:response[i].tipoActividad,
                icono:response[i].ruta_icono_activo,
                estado:response[i].estado,
                modal:response[i].modal
            }
        }else{
            TipoActi[i]={
                idTipoActividad:response[i].idTipoActividad,
                tipoActividad:response[i].tipoActividad,
                icono:response[i].ruta_icono_inactivo,
                estado:response[i].estado,
                modal:response[i].modal
            }
        }
    }
    return TipoActi;
}
export {getTipoActividadService}