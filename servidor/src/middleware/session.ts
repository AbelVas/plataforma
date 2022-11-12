import { NextFunction,Request,Response } from "express"
import { verifyToken } from "../utils/jwt.generador";

const checkJwt=(req:Request,res:Response,next:NextFunction)=>{
    try{
        const jwtByUser=req.header('Auth-Token');
        console.log(jwtByUser);
        if(jwtByUser==""){
            console.log("NUlO");
        }else{
            const isOk=verifyToken(jwtByUser);
            if(isOk){
                next()
            }  
        }
    }catch(e){
        res.status(400);
        res.send("Tu token y/o Sesión no es Valida")
    }
}
export {checkJwt}