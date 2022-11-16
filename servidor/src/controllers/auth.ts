import { Request, response, Response } from "express"
import {loginUser} from "../service/auth"
import { handleHttp } from "../utils/error.handle"


const loginController=async({body}:Request,res:Response)=>{
    try{
        const {usuario,pass}=body;
        const responseUser=await loginUser(usuario,pass);
        if(responseUser==='Usuario o Contraseña Incorrecta'){
            //res.status(403);
            res.send(responseUser);
        }else{
            res.send(responseUser);   
        }
    }catch(e){
         handleHttp(res,'Error, No existe el Usuario',e)
    }
}
export {loginController}