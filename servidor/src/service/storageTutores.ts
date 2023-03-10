import conexion from "../config/database";

const GetArchivosTutorService=async()=>{

    const responseGet=await conexion.query('SELECT imagen FROM tbTutor');
    return responseGet;

}


export{GetArchivosTutorService}