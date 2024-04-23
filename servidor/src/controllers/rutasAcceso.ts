import { Request,Response } from "express"
import { getRutasService } from "../service/rutasAcceso"
import { handleHttp } from "../utils/error.handle"

const getRutas=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultadoRuta=await getRutasService(id);
        res.send(resultadoRuta);
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export {getRutas}