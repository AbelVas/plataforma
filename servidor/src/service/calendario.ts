import conexion from "../config/database";

const getActividadesPorAlumno=async(idUsuario:string)=>{
    const response=await conexion.query('SELECT da.detalle, da.cotejo,da.nombre_actividad, DATE_FORMAT(da.fecha_entrega, "%Y-%m-%d") as fecha_entrega,tc.color_curso,tc.idCurso,tc.nombre_curso FROM((tbAlumno al INNER JOIN tbCurso tc ON al.idGrado=tc.idGrado)INNER JOIN tbDetalleActividad da ON tc.idCurso=da.idCurso)INNER JOIN tbUnidad u ON u.idUnidad=da.idUnidad WHERE al.idAlumno=? and u.estado=1 ORDER BY da.fecha_entrega DESC;',[idUsuario])
    return response;
}

const getActividadesPorProfesor=async(idUsuario:string)=>{
    const response=await conexion.query('SELECT da.detalle,da.nombre_actividad, DATE_FORMAT(da.fecha_entrega, "%Y-%m-%d") as fecha_entrega,tc.color_curso,tc.nombre_curso,tc.idCurso,tc.idProfesor,tc.idGrado FROM (tbCurso tc INNER JOIN tbDetalleActividad da ON tc.idCurso=da.idCurso)INNER JOIN tbUnidad u ON u.idUnidad=da.idUnidad WHERE tc.idProfesor=? and u.estado=1 ORDER BY da.fecha_entrega DESC;',[idUsuario])
    return response;
}

//este no sirve 
const getActividadesPorTutor=async(idUsuario:string)=>{
    const response=await conexion.query('SELECT da.detalle,da.nombre_actividad, DATE_FORMAT(da.fecha_entrega, "%Y-%m-%d") as fecha_entrega, FROM(tbAlumno al INNER JOIN tbCurso tc ON al.idGrado=tc.idGrado)INNER JOIN tbDetalleActividad da ON tc.idCurso=da.idCurso WHERE al.idTutor=? and al.idAlumno=? ORDER BY da.fecha_entrega DESC',[idUsuario])
    return response;
}

//para el curso
const getActividadesPorTipoExamen=async(idUsuario:string,idAlum:string)=>{
    const response=await conexion.query('SELECT ac.nombre_actividad,ac.detalle,ta.idExamen,ac.valor,ca.calificacion FROM(tbDetalleActividad ac INNER JOIN tbExamen ta ON ta.idDetalleActividad=ac.idDetalleActividad) INNER JOIN tbCalificacion ca ON ac.idDetalleActividad=ca.idDetalleActividad WHERE ac.idCurso=? AND ca.idAlumno=?',[idUsuario,idAlum])
    return response;
}

const getActividadesPorTipoTarea=async(idUsuario:string,idAlum:string)=>{
    const response=await conexion.query('SELECT ac.nombre_actividad,ac.detalle, ac.cotejo ,ta.idTarea,ac.valor,ca.calificacion FROM(tbDetalleActividad ac INNER JOIN tbTarea ta ON ta.idDetalleActividad=ac.idDetalleActividad) INNER JOIN tbCalificacion ca ON ac.idDetalleActividad=ca.idDetalleActividad WHERE ac.idCurso=? AND ca.idAlumno=?',[idUsuario,idAlum])
    return response;
}

const getActividadesPorTipoForo=async(idUsuario:string,idAlum:string)=>{
    const response=await conexion.query('SELECT ac.nombre_actividad,ac.detalle,ta.idForo,ac.valor,ca.calificacion FROM(tbDetalleActividad ac INNER JOIN tbForo ta ON ta.idDetalleActividad=ac.idDetalleActividad) INNER JOIN tbCalificacion ca ON ac.idDetalleActividad=ca.idDetalleActividad WHERE ac.idCurso=? AND ca.idAlumno=?',[idUsuario,idAlum])
    return response;
}

const getActividadesCalificacionAlumno=async(idUsuario:string,idAlum:string)=>{
    const response=await conexion.query('SELECT da.nombre_actividad,ca.calificacion,ta.tipoActividad,da.valor FROM(tbDetalleActividad da INNER JOIN tbTipoActividad ta ON da.idTipoActividad=ta.idTipoActividad)INNER JOIN tbCalificacion ca ON da.idDetalleActividad=ca.idDetalleActividad WHERE da.idCurso=? AND ca.idAlumno=?',[idUsuario,idAlum])
    return response;
}

const getActividadesCalificacionAlumnoTotal=async(idUsuario:string,idAlum:string)=>{
    const response=await conexion.query('SELECT SUM(ca.calificacion) as califitotal FROM(tbDetalleActividad da INNER JOIN tbTipoActividad ta ON da.idTipoActividad=ta.idTipoActividad)INNER JOIN tbCalificacion ca ON da.idDetalleActividad=ca.idDetalleActividad WHERE da.idCurso=? AND ca.idAlumno=?',[idUsuario,idAlum])
    return response;
}
export{getActividadesPorAlumno,getActividadesPorTutor,getActividadesPorProfesor,getActividadesPorTipoExamen,getActividadesPorTipoTarea,getActividadesPorTipoForo,getActividadesCalificacionAlumno,getActividadesCalificacionAlumnoTotal}