import conexion from "../config/database";

const GetArchivosAlumnosService=async()=>{

    const responseGet=await conexion.query('SELECT imagen FROM tbAlumno');
    return responseGet;

}


export{GetArchivosAlumnosService}