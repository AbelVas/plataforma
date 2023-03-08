import conexion from "../config/database";

const GetArchivosService=async()=>{

    const responseGet=await conexion.query('SELECT * FROM tbRecursoArchivo');
    return responseGet;

}


export{GetArchivosService}