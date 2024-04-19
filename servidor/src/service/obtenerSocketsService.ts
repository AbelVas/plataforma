import conexion from "../config/database";

const obtenerSocketDocente=async(idUsuario:string)=>{
    const getSocketsDocentes=await conexion.query("SELECT socket FROM tbSocketsProfesores WHERE idProfesor=?",[idUsuario])
    return getSocketsDocentes;
}


export {obtenerSocketDocente}