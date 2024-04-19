import conexion from "../config/database";



const insertNotificacion=async(data:any)=>{
   const insertNotificacionDocente=await conexion.query("INSERT INTO tbNotificaciones set ?",[data])
    return insertNotificacionDocente;
}
const getNotificaciones=async(idUsuarioRecibe:string,idRolRecibe:string)=>{
   const getnotificaciones=await conexion.query('SELECT noti.idNotificacionProfesor as "idNotificacion",noti.titulo_notificacion,noti.mensaje, rolEnvia.rol as "RolEnvia", IFNULL(CONCAT(profeEnvia.nombre_profesor," ",profeEnvia.apellido_profesor), CONCAT(alumnoEnvia.nombres_alumno," ", alumnoEnvia.apellidos_alumno)) as "UsuarioEnvia",rolRecibe.rol as "RolRecibe",IFNULL(CONCAT(profeRecibe.nombre_profesor," ",profeRecibe.apellido_profesor), CONCAT(alumnoRecibe.nombres_alumno," ", alumnoRecibe.apellidos_alumno)) as "UsuarioRecibe", noti.visto_recibe,noti.fecha_creacion FROM tbNotificaciones noti inner join tbRol rolEnvia ON rolEnvia.idRol=noti.idRolEnvia inner join tbRol rolRecibe ON rolRecibe.idRol=noti.idRolRecibe LEFT JOIN tbProfesor profeEnvia ON profeEnvia.idProfesor=noti.idUsuarioEnvia and profeEnvia.idRol=noti.idRolEnvia LEFT JOIN tbProfesor profeRecibe ON profeRecibe.idProfesor=noti.idUsuarioRecibe and profeRecibe.idRol=noti.idRolRecibe LEFT JOIN tbAlumno alumnoRecibe ON alumnoRecibe.idAlumno=noti.idUsuarioRecibe and alumnoRecibe.idRol=noti.idRolRecibe LEFT JOIN tbAlumno alumnoEnvia ON alumnoEnvia.idAlumno=noti.idUsuarioEnvia and alumnoEnvia.idRol=noti.idRolEnvia WHERE noti.idUsuarioRecibe=? and noti.idRolRecibe=? ORDER BY noti.idNotificacionProfesor DESC',[idUsuarioRecibe, idRolRecibe])
   return getnotificaciones
}

const editarVistaRecibeDocente=async(idUsuarioRecibe:string,idRolRecibe:string,idNotificacion:string)=>{
    const vistaNotificacionesDocente=await conexion.query("UPDATE tbNotificaciones SET visto_recibe=1 WHERE idUsuarioRecibe=? and idRolRecibe=? and idNotificacionProfesor=?",[idUsuarioRecibe,idRolRecibe,idNotificacion])
    return vistaNotificacionesDocente;
}


export{getNotificaciones,insertNotificacion,editarVistaRecibeDocente}