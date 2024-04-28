import { Request} from "express";
import conexion from "../config/database";

const obtenerImagenCategoriaService= async(id:string) =>{
    const responseGet=await conexion.query('SELECT ruta FROM tbImagenPerfil WHERE idCategoriaImagenPerfil=?',[id]);
    return responseGet;
}
const obtenerCatecoriaImagenService=async()=>{
    const responseGet=await conexion.query('SELECT `idCategoriaImagenPerfil`, `categoria` FROM `tbCategoriaImagenPerfil`');
    return responseGet;
}
const obtenerImagenSubidUsuarioAlumno=async(idUsuario:string)=>{
    const consulta=await conexion.query('SELECT ruta_imagen FROM tbImagenPerfilAlumno WHERE idAlumno=? and subida=1',[idUsuario])
    return consulta
}
const obtenerImagenSubidUsuarioProfesor=async(idUsuario:string)=>{
    const consulta=await conexion.query('SELECT ruta_imagen FROM tbImagenPerfilProfesor WHERE idProfesor=? and subida=1',[idUsuario])
    return consulta
}
const ActualizarImagenPerfilAlumno=async(id:string,ruta:any,subida:string)=>{
    const verificar=await conexion.query("SELECT ruta_imagen,subida FROM tbImagenPerfilAlumno WHERE idAlumno=? and subida=?",[id,subida])
    if(verificar!=''){
        if(subida!='1'){
            const update=await conexion.query("UPDATE tbImagenPerfilAlumno SET activa=0 WHERE idAlumno=?",[id])
            const update2=await conexion.query("UPDATE tbImagenPerfilAlumno SET activa=1, peso_archivo=0, subida=0, ruta_imagen=? WHERE idAlumno=? and subida=0",[ruta,id])
            return update2
        }else{
            const update=await conexion.query("UPDATE tbImagenPerfilAlumno SET activa=0 WHERE idAlumno=?",[id])
            const update2=await conexion.query("UPDATE tbImagenPerfilAlumno SET activa=1 WHERE idAlumno=? and subida=1 and ruta_imagen=?",[id,ruta])
            return update2
        }
    }else{
        const update=await conexion.query("UPDATE tbImagenPerfilAlumno SET activa=0 WHERE idAlumno=?",[id])
        const consulta=await conexion.query("INSERT INTO tbImagenPerfilAlumno(idAlumno,ruta_imagen,peso_archivo,activa,subida) values(?,?,0,1,0)",[id,ruta])
        return consulta
    }
}
const ActualizarImagenPerfilProfesor=async(id:string,ruta:any,subida:string)=>{
    const verificar=await conexion.query("SELECT ruta_imagen,subida FROM tbImagenPerfilProfesor WHERE idProfesor=? and subida=? ",[id,subida])
    if(verificar!=''){
        if(subida!='1'){
            const update=await conexion.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?",[id])
            const update2=await conexion.query("UPDATE tbImagenPerfilProfesor SET activa=1, peso_archivo=0, subida=0, ruta_imagen=? WHERE idProfesor=? and subida=0",[ruta,id])
            return update2
        }else{
            const update=await conexion.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?",[id])
            const update2=await conexion.query("UPDATE tbImagenPerfilProfesor SET activa=1 WHERE idProfesor=? and subida=1 and ruta_imagen=?",[id,ruta])
            return update2
        }
    }else{
        const update=await conexion.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?",[id])
        const consulta=await conexion.query("INSERT INTO tbImagenPerfilProfesor(idProfesor,ruta_imagen,peso_archivo,activa,subida) values(?,?,0,1,0)",[id,ruta])
        return consulta
    }
}
const getImagenesSubidasPorProfesorCursoService=async(idCurso:string)=>{
    const consulta=await conexion.query('SELECT ruta_imagen FROM tbImagenCurso WHERE idCurso=? and subida=1',[idCurso])
    return consulta
}

export {getImagenesSubidasPorProfesorCursoService,ActualizarImagenPerfilProfesor,ActualizarImagenPerfilAlumno,obtenerImagenSubidUsuarioProfesor,obtenerImagenSubidUsuarioAlumno,obtenerImagenCategoriaService,obtenerCatecoriaImagenService}