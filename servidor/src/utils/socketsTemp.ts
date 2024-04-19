import { Socket } from "socket.io";
import conexion from "../config/database";

export const socketsTemp = new Map<string, { idUsuario: string; idRol:string,rol:string,socket: Socket }>();

const guardarSocketTemporal = async (idSocket: string, idUsuario: string,idRol:string,rol:string, socket: Socket) => {
  socketsTemp.set(idSocket, { idUsuario, idRol,rol,socket });
  if(idRol=="1"){
    //const consulta=await conexion.query("INSERT INTO tbSocketsProfesores(idProfesor,idRol,socket) VALUES (?,?,?)",[idUsuario,idRol,idSocket])
  }else if(idRol=="2"){
    //const consulta=await conexion.query("INSERT INTO tbSocketsProfesores(idProfesor,idRol,socket) VALUES (?,?,?)",[idUsuario,idRol,idSocket])
  }else if(idRol=="3"){
    //console.log(`Socket ${idSocket} guardado temporalmente para usuario ${idUsuario} que es "Padre Tutor"`);
  }else if(idRol=="4"){
    //const consulta=await conexion.query("INSERT INTO tbSocketsAlumnos(idAlumno,idRol,socket) VALUES (?,?,?)",[idUsuario,idRol,idSocket])
  }else{
    //console.log(`Socket ${idSocket} guardado temporalmente para usuario ${idUsuario} que es "Secretaria"`);
  }
};

const eliminarSocketTemporal = async(idSocket: string,idRol:string) => {
  if(idRol=="1"){
    //const consulta=await conexion.query("DELETE FROM tbSocketsProfesores WHERE socket=? and idRol=?",[idSocket,idRol])
  }else if(idRol=="2"){
    //const consulta=await conexion.query("DELETE FROM tbSocketsProfesores WHERE socket=? and idRol=?",[idSocket,idRol])
  }else if(idRol=="3"){

  }else if(idRol=="4"){
    //const consulta=await conexion.query("DELETE FROM tbSocketsAlumnos WHERE socket=? and idRol=?",[idSocket,idRol])
  }else{
    //console.log(`Socket ${idSocket} eliminado "Secretaria"`);
  }
  socketsTemp.delete(idSocket);
};

const obtenerSocketTemporal = (idSocket: string, idUsuario: string,idRol:string,rol:string, socket: Socket) => {
  return socketsTemp.get(idSocket);
};

export {guardarSocketTemporal, eliminarSocketTemporal, obtenerSocketTemporal };
