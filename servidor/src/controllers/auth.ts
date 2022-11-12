import { Request, response, Response } from "express"
import {loginAdmin} from "../service/auth"
import { handleHttp } from "../utils/error.handle"


const loginController=async({body}:Request,res:Response)=>{
    try{
        const {usuario,pass}=body;
        const responseUser=await loginAdmin(usuario,pass);
        if(responseUser==='Usuario o Contraseña Incorrecta'){
            res.status(403);
            res.send(responseUser);
        }else{
            res.send(responseUser);   
        }
     }catch(e){
         handleHttp(res,'Error, No existe el Usuario',e)
     }
}

export {loginController}