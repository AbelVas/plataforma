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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerCursosNotasService = void 0;
const database_1 = __importDefault(require("../config/database"));
const obtenerCursosNotasService = (idGrado, idUnidad, idCurso) => __awaiter(void 0, void 0, void 0, function* () {
    var objetolineal = [];
    var notas = ['80', '90', '70', '100'];
    var alumnos = [];
    var atributos = {};
    var dataUsuario = [];
    const cursosConsolidado = yield database_1.default.query('SELECT nombre_curso,abreviatura FROM tbCurso WHERE idGrado=?', [idGrado]);
    var cantidadCursos = cursosConsolidado.length;
    const alumno = yield database_1.default.query('SELECT idAlumno,CONCAT(apellidos_alumno,", ",nombres_alumno) as alumno FROM tbAlumno WHERE idGrado=?', [idGrado]);
    var cantidadAlumnos = alumno.length;
    for (let i = 0; i < cantidadAlumnos; i++) {
        dataUsuario = Object.values(alumno);
        atributos.alumno = dataUsuario[i];
        for (let j = 0; j < cantidadCursos; j++) {
            var nota = 'nota' + j;
            atributos[nota] = j;
            //objetolineal[i]=atributos[i]
            objetolineal[i] = atributos;
        }
        //console.log(atributos)
        //var responseGet=await conexion.query('SELECT notaCurso(?,cur.idCurso,al.idAlumno) as nota FROM (tbGrado g INNER JOIN tbCurso cur ON cur.idGrado=g.idGrado)INNER JOIN tbAlumno al ON al.idGrado=g.idGrado WHERE g.idGrado=?  ORDER BY al.apellidos_alumno',[idUnidad,idGrado]); 
    }
    console.log(objetolineal);
    return objetolineal;
});
exports.obtenerCursosNotasService = obtenerCursosNotasService;
