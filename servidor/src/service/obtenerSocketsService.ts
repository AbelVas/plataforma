import conexion from "../config/database";

const obtenerSocketDocente=async(idUsuario:string)=>{
    const getSocketsDocentes=await conexion.query("SELECT socket FROM tbSocketsProfesores WHERE idProfesor=?",[idUsuario])
    return getSocketsDocentes;
}

const obtenerSocketStudent=async(idUsuario:string)=>{
    const getSocketsDocentes=await conexion.query("SELECT socket FROM tbSocketsAlumnos WHERE idAlumno=?",[idUsuario])
    return getSocketsDocentes;
}


export {obtenerSocketDocente,obtenerSocketStudent}