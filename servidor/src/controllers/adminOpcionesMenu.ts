import { request, Request,Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { sidebarServiceAdminOptions } from "../service/adminOpcionesMenu";

const getSideBarOpcionAdmin=async(req:Request,res:Response)=>{
    try {
        const query=await sidebarServiceAdminOptions();
        res.send(query)
    } catch (e) {
        handleHttp(res,'Error al Obtener a los Profesores')
    }
}

export {getSideBarOpcionAdmin}
