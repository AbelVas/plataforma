import conexion from "../config/database";

//traigo las tareas por curso (tanto foros, examenes, etc...)
const getActividadesCursoService=async(idCurso:string)=>{
    const response=await conexion.query('SELECT ac.idDetalleActividad,ac.nombre_actividad,ac.detalle,ac.cotejo,DATE_FORMAT(ac.fecha_entrega, "%Y-%m-%d") as fecha_entrega,ac.valor,ac.recurso,ac.ruta_recurso,DATE_FORMAT(ac.creada, "%Y-%m-%d") as creada,ac.disponible,ac.entrega_fuera_fecha,ta.tipoActividad,u.idUnidad,u.unidad,ac.ultima_modificacion, tc.color_curso FROM ((tbDetalleActividad ac INNER JOIN tbTipoActividad ta ON ta.idTipoActividad=ac.idTipoActividad)INNER JOIN tbCurso tc ON tc.idCurso=ac.idCurso)INNER JOIN tbUnidad u ON u.idUnidad=ac.idUnidad WHERE ac.idCurso=? ORDER BY ac.fecha_entrega DESC',[idCurso])
    return response;
}
const crearTareaService=async(dataActividad:any)=>{
    const idCurso=dataActividad.idCurso;
    const idTipoActividad=dataActividad.idTipoActividad
    const response=await conexion.query('INSERT INTO tbDetalleActividad set ?',[dataActividad])
    const ultimoRegistro=await conexion.query('SELECT MAX(idDetalleActividad) FROM tbDetalleActividad WHERE idCurso=?',[idCurso]);
    const DetalleActividad:any=Object.values(ultimoRegistro[0]);
    const idDetalleActividad=DetalleActividad[0];
    if(idTipoActividad==1){
        //tarea
        const InserttbTarea=await conexion.query('INSERT INTO tbTarea(idDetalleActividad) VALUES(?)',[idDetalleActividad])
        return true;
    }else if(idTipoActividad==2){
        //foro
        const InserttbTarea=await conexion.query('INSERT INTO tbForo(idDetalleActividad) VALUES(?)',[idDetalleActividad])
        return true;
    }else if(idTipoActividad==3){
        //examen
        const InserttbTarea=await conexion.query('INSERT INTO tbExamen(idDetalleActividad) VALUES(?)',[idDetalleActividad])
        return true;
    }else{
        const EliminarDetalleActividad=await conexion.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?',[idDetalleActividad]);
        return true
    }
}
const deleteTareaService=async(idActividad:string)=>{
    const deleteNotas=await conexion.query('DELETE FROM tbCalificacion WHERE idDetalleActividad=?',[idActividad]);
    const deletetbTarea=await conexion.query('DELETE FROM tbTarea WHERE idDetalleActividad=?',[idActividad]);
    const deletetbForo=await conexion.query('DELETE FROM tbForo WHERE idDetalleActividad=?',[idActividad]);
    const deletetbExamen=await conexion.query('DELETE FROM tbExamen WHERE idDetalleActividad=?',[idActividad]);
    const response= conexion.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?',[idActividad]);
    return response;

}
const updateActividadService=async(data:any,idActividad:string)=>{
    const response=await conexion.query('UPDATE tbDetalleActividad SET ? WHERE idDetalleActividad=?',[data,idActividad])
    return response
}
const duplicarActividades=async(data:any,idActividad:string)=>{
    const DatosActividadOriginal=await conexion.query('SELECT idUnidad,idTipoActividad,nombre_actividad,detalle,cotejo, DATE_FORMAT(fecha_entrega, "%Y-%m-%d") as fecha_entrega,valor,recurso,ruta_recurso,DATE_FORMAT(creada, "%Y-%m-%d") as creada,disponible,vence,entrega_fuera_fecha,ultima_modificacion FROM tbDetalleActividad WHERE idDetalleActividad=?',[idActividad]);
    var DatosObject:any=JSON.parse(JSON.stringify(DatosActividadOriginal))
    DatosObject[0].idCurso
    var contador=0;
    for(let i=0;i<data.length;i++){
        //console.log(data[i].idCurso)
        var Aux:any=0;
        DatosObject[0].idCurso=data[i].idCurso      
        const insertarCopias=await conexion.query('INSERT INTO tbDetalleActividad SET ?',[DatosObject[0]])
        const ultimoRegistro=await conexion.query('SELECT MAX(idDetalleActividad) FROM tbDetalleActividad WHERE idCurso=?',[DatosObject[0].idCurso]);
        const DetalleActividad:any=Object.values(ultimoRegistro[0]);
        const idDetalleActividad=DetalleActividad[0];
        if(DatosObject[0].idTipoActividad=='1'){
            //copiar tarea
            const InserttbTarea=await conexion.query('INSERT INTO tbTarea(idDetalleActividad) VALUES(?)',[idDetalleActividad])
            if(InserttbTarea){
                Aux=i+1;
            }else{
                const EliminarDetalleActividad=await conexion.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?',[idDetalleActividad]);
            }
        }else if(DatosObject[0].idTipoActividad=='2'){
            //foro
            const InserttbTarea=await conexion.query('INSERT INTO tbForo(idDetalleActividad) VALUES(?)',[idDetalleActividad])
            if(InserttbTarea){
                Aux=i+1;
            }else{
                const EliminarDetalleActividad=await conexion.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?',[idDetalleActividad]);
            }
        }else if(DatosObject[0].idTipoActividad=='3'){
            //examen
            const InserttbTarea=await conexion.query('INSERT INTO tbExamen(idDetalleActividad) VALUES(?)',[idDetalleActividad])
            if(InserttbTarea){
                Aux=i+1;
            }else{
                const EliminarDetalleActividad=await conexion.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?',[idDetalleActividad]);
            }
        }
    }
    //console.log(Aux)
   //console.log(data.length)
    return true
}
export {crearTareaService,getActividadesCursoService,deleteTareaService,updateActividadService,duplicarActividades}