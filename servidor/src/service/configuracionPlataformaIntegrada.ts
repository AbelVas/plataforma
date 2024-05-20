import conexion from "../config/database";

const getConfiguracionesService=async()=>{
    const query=await conexion.query("SELECT desp.idConfiguracionesPlataforma,p.plan,p.descripcion,desp.tamano_maximo_foto_perfil_usuario,desp.tamano_maximo_foto_curso,desp.tamano_maximo_archivo_actividadaes,desp.tamano_maximo_archivo_recurso,desp.tamano_maximo_subida_alumno,desp.tamano_maximo_subida_rubrica_actividad,desp.tamano_maximo_subida_descripcion_actividad,desp.tamano_maximo_renas_penales_policiacos,GROUP_CONCAT(DISTINCT eimg.extension SEPARATOR ',') AS extensiones_imagenes,GROUP_CONCAT(DISTINCT ea.extension SEPARATOR ',') AS extensiones_documentos FROM tbPlan p INNER JOIN tbPlanAdquirido plad ON p.idPlan = plad.idPlan INNER JOIN tbDesplieguePlataforma desp ON desp.idConfiguracionesPlataforma = plad.idConfiguracionesPlataforma INNER JOIN tbExtensionesPermitidasImagenes eimg ON eimg.idConfiguracionesPlataforma = desp.idConfiguracionesPlataforma INNER JOIN tbExtensionesPermitidasArchivos ea ON ea.idConfiguracionesPlataforma=desp.idConfiguracionesPlataforma WHERE p.activo = 1 GROUP BY p.plan, p.descripcion;")
    return query
}
const getExtensionesImagenesService=async()=>{
    const query=await conexion.query("SELECT idExtensionesImagenes,admin_agrega, extension, fecha_agrega,admin_edita,fecha_editada,activo FROM tbExtensionesPermitidasImagenes")
    return query
}
const getExtensionesDocumentosService=async()=>{
    const query=await conexion.query("SELECT idExtensionesArchivos,admin_agrega, extension, fecha_agrega,admin_edita,fecha_editada,activo FROM tbExtensionesPermitidasArchivos")
    return query
}

export {getConfiguracionesService,getExtensionesImagenesService,getExtensionesDocumentosService}