import {sign, verify} from "jsonwebtoken";

const JWT_SECRET="fc368f3e3407a7606f3d8d85db76a2f439ead8d0ab7f0c7becc5ad45bf601e16";


const generateToken=(idUsuario:string,idRol:string,nombre_profesor:string,apellido_profesor:string,rol:string)=>{
    const jwt=sign({idUsuario,idRol,nombre_profesor,apellido_profesor,rol},JWT_SECRET,{expiresIn:"24h"});
    return jwt;
}
const verifyToken=(jwt:any)=>{
    const isOk=verify(jwt,JWT_SECRET);
    return isOk;
    
}

export {generateToken,verifyToken}