"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerSocketTemporal = exports.eliminarSocketTemporal = exports.guardarSocketTemporal = exports.socketsTemp = void 0;
exports.socketsTemp = new Map();
const guardarSocketTemporal = (idSocket, idUsuario, idRol, rol, socket) => __awaiter(void 0, void 0, void 0, function* () {
    exports.socketsTemp.set(idSocket, { idUsuario, idRol, rol, socket });
    if (idRol == "1") {
        //const consulta=await conexion.query("INSERT INTO tbSocketsProfesores(idProfesor,idRol,socket) VALUES (?,?,?)",[idUsuario,idRol,idSocket])
    }
    else if (idRol == "2") {
        //const consulta=await conexion.query("INSERT INTO tbSocketsProfesores(idProfesor,idRol,socket) VALUES (?,?,?)",[idUsuario,idRol,idSocket])
    }
    else if (idRol == "3") {
        //console.log(`Socket ${idSocket} guardado temporalmente para usuario ${idUsuario} que es "Padre Tutor"`);
    }
    else if (idRol == "4") {
        //const consulta=await conexion.query("INSERT INTO tbSocketsAlumnos(idAlumno,idRol,socket) VALUES (?,?,?)",[idUsuario,idRol,idSocket])
    }
    else {
        //console.log(`Socket ${idSocket} guardado temporalmente para usuario ${idUsuario} que es "Secretaria"`);
    }
});
exports.guardarSocketTemporal = guardarSocketTemporal;
const eliminarSocketTemporal = (idSocket, idRol) => __awaiter(void 0, void 0, void 0, function* () {
    if (idRol == "1") {
        //const consulta=await conexion.query("DELETE FROM tbSocketsProfesores WHERE socket=? and idRol=?",[idSocket,idRol])
    }
    else if (idRol == "2") {
        //const consulta=await conexion.query("DELETE FROM tbSocketsProfesores WHERE socket=? and idRol=?",[idSocket,idRol])
    }
    else if (idRol == "3") {
    }
    else if (idRol == "4") {
        //const consulta=await conexion.query("DELETE FROM tbSocketsAlumnos WHERE socket=? and idRol=?",[idSocket,idRol])
    }
    else {
        //console.log(`Socket ${idSocket} eliminado "Secretaria"`);
    }
    exports.socketsTemp.delete(idSocket);
});
exports.eliminarSocketTemporal = eliminarSocketTemporal;
const obtenerSocketTemporal = (idSocket, idUsuario, idRol, rol, socket) => {
    return exports.socketsTemp.get(idSocket);
};
exports.obtenerSocketTemporal = obtenerSocketTemporal;
