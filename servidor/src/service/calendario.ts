import conexion from "../config/database";

const getActividadesPorAlumno=async(idUsuario:string)=>{
    const response=await conexion.query('SELECT da.detalle,da.nombre_actividad, DATE_FORMAT(da.fecha_entrega, "%Y-%m-%d") as fecha_entrega FROM(tbAlumno al INNER JOIN tbCurso tc ON al.idGrado=tc.idGrado)INNER JOIN tbDetalleActividad da ON tc.idCurso=da.idCurso WHERE al.idAlumno=? ORDER BY da.fecha_entrega DESC;',[idUsuario])
    return response;
}

const getActividadesPorTutor=async(idUsuario:string)=>{
    const response=await conexion.query('SELECT da.detalle,da.nombre_actividad, DATE_FORMAT(da.fecha_entrega, "%Y-%m-%d") as fecha_entrega FROM tbCurso tc INNER JOIN tbDetalleActividad da ON tc.idCurso=da.idCurso WHERE tc.idProfesor=? ORDER BY da.fecha_entrega DESC;',[idUsuario])
    return response;
}

const getActividadesPorProfesor=async(idUsuario:string)=>{
    const response=await conexion.query('SELECT da.detalle,da.nombre_actividad, DATE_FORMAT(da.fecha_entrega, "%Y-%m-%d") as fecha_entrega FROM(tbAlumno al INNER JOIN tbCurso tc ON al.idGrado=tc.idGrado)INNER JOIN tbDetalleActividad da ON tc.idCurso=da.idCurso WHERE al.idTutor=? and al.idAlumno=? ORDER BY da.fecha_entrega DESC',[idUsuario])
    return response;
}

//para el curso
const getActividadesPorTipoExamen=async(idUsuario:string)=>{
    const response=await conexion.query('SELECT ac.nombre_actividad,ta.idExamen FROM tbDetalleActividad ac INNER JOIN tbExamen ta ON ta.idDetalleActividad=ac.idDetalleActividad WHERE ac.idCurso=?',[idUsuario])
    return response;
}

const getActividadesPorTipoTarea=async(idUsuario:string)=>{
    const response=await conexion.query('SELECT ac.nombre_actividad,ta.idTarea FROM tbDetalleActividad ac INNER JOIN tbTarea ta ON ta.idDetalleActividad=ac.idDetalleActividad WHERE ac.idCurso=?',[idUsuario])
    return response;
}

const getActividadesPorTipoForo=async(idUsuario:string)=>{
    const response=await conexion.query('SELECT ac.nombre_actividad,ta.idForo FROM tbDetalleActividad ac INNER JOIN tbForo ta ON ta.idDetalleActividad=ac.idDetalleActividad WHERE ac.idCurso=?',[idUsuario])
    return response;
}
export{getActividadesPorAlumno,getActividadesPorTutor,getActividadesPorProfesor,getActividadesPorTipoExamen,getActividadesPorTipoTarea,getActividadesPorTipoForo}