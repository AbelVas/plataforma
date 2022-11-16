import { NextFunction,Request,Response } from "express"
import { verifyToken } from "../utils/jwt.generador";
import conexion from "../config/database";


const checkRol=(roles:any)=>async(req:Request,res:Response,next:NextFunction)=>{
    try {
        var errorRolValidacion=0;
        const token=req.header('Auth-Token');
        const tokenData:any=verifyToken(token);
        const resBD=await conexion.query("SELECT idProfesor,idRol FROM tbProfesor WHERE idRol=? and idProfesor=?",[tokenData.idRol,tokenData.idUsuario]);
        for (let i = 0; i < roles.length; i++) {
            if(roles[i]==resBD[0].idRol){
                next()
                break;
                //
            }else{
                errorRolValidacion=errorRolValidacion+1;
                
            } 
        }
        if(errorRolValidacion!=0){
            res.send("Error, no tienes permisos")
        }

    } 
    catch (error) {
        console.log(error) 
        //res.send("no se detecta nada")
    }
}

export {checkRol}