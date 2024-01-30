import conexion from "../config/database";

const getAlumnosCalificacionActividadCursUnidadService=async(idActividad:string,idUnidad:string,idCurso:string)=>{
    const response=await conexion.query('SELECT al.idAlumno,CONCAT(al.apellidos_alumno,", ",al.nombres_alumno) as alumno,NotasActividades(d.idCurso,al.idAlumno,d.idDetalleActividad,d.idUnidad) as nota,d.valor FROM ((((tbCalificacion c RIGHT JOIN tbDetalleActividad d ON d.idDetalleActividad=c.idDetalleActividad)INNER JOIN tbUnidad u ON u.idUnidad=d.idUnidad)INNER JOIN tbCurso cur ON cur.idCurso=d.idCurso)INNER JOIN tbGrado g ON g.idGrado=cur.idGrado)INNER JOIN tbAlumno al ON al.idGrado=g.idGrado WHERE d.idDetalleActividad=? and d.idUnidad=? and d.idCurso=? GROUP BY al.idAlumno ORDER BY al.apellidos_alumno',[idActividad,idUnidad,idCurso])
    return response
}
const calificarActividadService=async(idAlumno:string,idDetalleActividad:string,calificacion:string)=>{
    const selectCalificacion=await conexion.query('SELECT idCalificacion FROM tbCalificacion WHERE idAlumno=? and idDetalleActividad=?',[idAlumno,idDetalleActividad]);
    if(selectCalificacion!=''){
        const updateNota=await conexion.query('UPDATE tbCalificacion SET calificacion=? WHERE idAlumno=? and idDetalleActividad=?',[calificacion,idAlumno,idDetalleActividad]);
        return true
    }else{
        const insertNota=await conexion.query('INSERT INTO tbCalificacion(idAlumno,idDetalleActividad,calificacion) VALUES(?, ?, ?)',[idAlumno,idDetalleActividad,calificacion])
        return true
    }
}

const getCalificacionesAlumnoActividadService=async(idCurso:string, idAlumno:string)=>{
    const selectCalificacionAlumno=await conexion.query('SELECT d.cotejo,d.idDetalleActividad,d.nombre_actividad,d.idTipoActividad,d.valor,d.disponible,u.unidad,d.detalle,t.tipoActividad,al.idAlumno,CONCAT(al.apellidos_alumno,", ",al.nombres_alumno) as alumno,NotasActividades(d.idCurso,al.idAlumno,d.idDetalleActividad,d.idUnidad) as nota,d.valor,d.fecha_entrega,d.entrega_fuera_fecha FROM ((((tbCalificacion c RIGHT JOIN tbDetalleActividad d ON d.idDetalleActividad=c.idDetalleActividad)INNER JOIN tbUnidad u ON u.idUnidad=d.idUnidad)INNER JOIN tbCurso cur ON cur.idCurso=d.idCurso)INNER JOIN tbGrado g ON g.idGrado=cur.idGrado)INNER JOIN tbAlumno al ON al.idGrado=g.idGrado INNER JOIN tbTipoActividad t ON t.idTipoActividad=d.idTipoActividad WHERE d.idCurso=? and al.idAlumno=? and u.estado=1 GROUP BY d.idDetalleActividad',[idCurso,idAlumno]);
    return selectCalificacionAlumno
}

export {getAlumnosCalificacionActividadCursUnidadService,calificarActividadService,getCalificacionesAlumnoActividadService}