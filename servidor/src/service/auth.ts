
import { encrypt, verified } from "../utils/passwordFunction"
import conexion from "../config/database";
import { generateToken } from "../utils/jwt.generador";

const loginUser=async(email:string,password:string)=>{
    var data:any
    const checkIs=await conexion.query("SELECT p.idProfesor,p.idRol,p.pass,p.nombre_profesor,p.apellido_profesor,p.usuario,r.rol FROM tbProfesor p INNER JOIN tbRol r ON r.idRol=p.idRol WHERE p.usuario=? GROUP BY p.idProfesor",[email]);
    if(checkIs==''){
        const checkIs=await conexion.query("SELECT t.idTutor,t.idRol,t.pass,t.nombre_tutor,t.apellido_tutor,t.usuario,r.rol FROM tbTutor t INNER JOIN tbRol r ON r.idRol=t.idRol WHERE t.usuario=? GROUP BY t.idTutor",[email]);
        if(checkIs==''){
            const checkIs=await conexion.query("SELECT a.idAlumno,a.idRol,a.pass,a.nombres_alumno,a.apellidos_alumno,a.usuario,r.rol FROM tbAlumno a INNER JOIN tbRol r ON r.idRol=a.idRol WHERE a.usuario=? GROUP BY a.idAlumno",[email]);
            if(checkIs==''){
                return "Usuario o Contraseña Incorrecta"
            }else{
                const dataUsuario:any=Object.values(checkIs[0]);
                const passwordHash=dataUsuario[2]
                const isCorrect=await verified(password,passwordHash);
                if(!isCorrect) return "Usuario o Contraseña Incorrecta";
                // Datos para el Json Web Token
                const idUsuario=dataUsuario[0];
                const idRol=dataUsuario[1];
                const nombres_alumnos=dataUsuario[3];
                const apellidos_alumnos=dataUsuario[4];
                const usuario=dataUsuario[5];
                const rol=dataUsuario[6];

                // Fin de datos para el JSON webToken
                //data en modo objeto
                let results=JSON.parse(JSON.stringify(checkIs))
                delete results[0].pass
                let datos = Object.values(results);
                //fin de data en modo objeto
                const token=generateToken(idUsuario,idRol,nombres_alumnos,apellidos_alumnos,usuario,rol);
                data={
                    token,
                    user:datos
                }
            }
        }else{
            const dataUsuario:any=Object.values(checkIs[0]);
            const passwordHash=dataUsuario[2]
            const isCorrect=await verified(password,passwordHash);
            if(!isCorrect) return "Usuario o Contraseña Incorrecta";
            // Datos para el Json Web Token
            const idUsuario=dataUsuario[0];
            const idRol=dataUsuario[1];
            const nombre_tutor=dataUsuario[3];
            const apellido_tutor=dataUsuario[4];
            const usuario=dataUsuario[5];
            const rol=dataUsuario[6];

            // Fin de datos para el JSON webToken
            //data en modo objeto
            let results=JSON.parse(JSON.stringify(checkIs))
            delete results[0].pass
            let datos = Object.values(results);
            //fin de data en modo objeto
            const token=generateToken(idUsuario,idRol,nombre_tutor,apellido_tutor,usuario,rol);
            data={
                token,
                user:datos
            }
        }
    }else{
        const dataUsuario:any=Object.values(checkIs[0]);
        const passwordHash=dataUsuario[2]
        const isCorrect=await verified(password,passwordHash);
        if(!isCorrect) return "Usuario o Contraseña Incorrecta";
        // Datos para el Json Web Token
        const idUsuario=dataUsuario[0];
        const idRol=dataUsuario[1];
        const nombre_profesor=dataUsuario[3];
        const apellido_profesor=dataUsuario[4];
        const usuario=dataUsuario[5];
        const rol=dataUsuario[6];

        // Fin de datos para el JSON webToken
        //data en modo objeto
        let results=JSON.parse(JSON.stringify(checkIs))
        delete results[0].pass
        let datos = Object.values(results);
        //fin de data en modo objeto
        const token=generateToken(idUsuario,idRol,nombre_profesor,apellido_profesor,usuario,rol);
        data={
            token,
            user:datos
        }
    }
    return data; 
}
export {loginUser}