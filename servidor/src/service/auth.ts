
import { encrypt, verified } from "../utils/passwordFunction"
import conexion from "../config/database";
import { generateToken } from "../utils/jwt.generador";

const loginAdmin=async(email:string,password:string)=>{
    const checkIs=await conexion.query("SELECT idProfesor,idRol,pass FROM `tbProfesor` WHERE `usuario`=? and idRol='1'",[email]);
    if(checkIs=='') return "Usuario o Contraseña Incorrecta"
    const dataUsuario:any=Object.values(checkIs[0]);
    const passwordHash=dataUsuario[2]
    // Datos para el Json Web Token
    const idUsuario=dataUsuario[0];
    const idRol=dataUsuario[1];
    // Fin de datos para el JSON webToken
    //data en modo objeto
    let result = Object.values(JSON.parse(JSON.stringify(checkIs)));
    //fin de data en modo objeto
    const isCorrect=await verified(password,passwordHash);
    if(!isCorrect) return "Usuario o Contraseña Incorrecta";
    const token=generateToken(idUsuario,idRol);
    const data={
        token,
        user:result
    }
    return data;
}

export {loginAdmin}