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
exports.updateGradoGuia = exports.deleteGradoGuia = exports.insertarGradoGuia = exports.obtenerGradosSinGuias = exports.obtenerGuiasExistente = void 0;
const database_1 = __importDefault(require("../config/database"));
const obtenerGuiasExistente = () => __awaiter(void 0, void 0, void 0, function* () {
    const getDatosGuiasExistentes = yield database_1.default.query("SELECT gg.idGuias,g.idGrado,CONCAT(g.nombre_grado,', ',s.seccion,', ',n.nivel,', ',j.jornada) AS Grado,gg.idProfesor,concat(p.apellido_profesor,', ',p.nombre_profesor) AS profesor FROM tbGrado g LEFT JOIN tbGuiaGrado gg ON g.idGrado=gg.idGrado LEFT JOIN tbProfesor p ON gg.idProfesor=p.idProfesor LEFT JOIN tbSeccion s ON s.idSeccion=g.idSeccion LEFT JOIN tbNivel n ON n.idNivel=g.idNivel LEFT JOIN tbJornada j ON j.idJornada=n.idJornada WHERE gg.idGrado IS NOT NULL ORDER BY g.idGrado");
    return getDatosGuiasExistentes;
});
exports.obtenerGuiasExistente = obtenerGuiasExistente;
const obtenerGradosSinGuias = () => __awaiter(void 0, void 0, void 0, function* () {
    const getGradosSinGuias = yield database_1.default.query("SELECT gg.idGuias,g.idGrado,CONCAT(g.nombre_grado,', ',s.seccion,', ',n.nivel,', ',j.jornada) AS Grado,gg.idProfesor,concat(p.apellido_profesor,', ',p.nombre_profesor) AS profesor FROM tbGrado g LEFT JOIN tbGuiaGrado gg ON g.idGrado=gg.idGrado LEFT JOIN tbProfesor p ON gg.idProfesor=p.idProfesor LEFT JOIN tbSeccion s ON s.idSeccion=g.idSeccion LEFT JOIN tbNivel n ON n.idNivel=g.idNivel LEFT JOIN tbJornada j ON j.idJornada=n.idJornada WHERE gg.idGrado IS NULL ORDER BY g.idGrado");
    return getGradosSinGuias;
});
exports.obtenerGradosSinGuias = obtenerGradosSinGuias;
const insertarGradoGuia = (idProfesor, idGrado) => __awaiter(void 0, void 0, void 0, function* () {
    const createGradoGuia = yield database_1.default.query("INSERT INTO tbGuiaGrado set idProfesor=?, idGrado=?", [idProfesor, idGrado]);
    return true;
});
exports.insertarGradoGuia = insertarGradoGuia;
const deleteGradoGuia = (idGuias) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteGradoGuia = yield database_1.default.query("DELETE FROM tbGuiaGrado WHERE idGuias=?", [idGuias]);
    return true;
});
exports.deleteGradoGuia = deleteGradoGuia;
const updateGradoGuia = (data, idGuias) => __awaiter(void 0, void 0, void 0, function* () {
    const updateGradoGuia = yield database_1.default.query("UPDATE tbGuiaGrado SET ? WHERE idGuias=?", [data, idGuias]);
    return true;
});
exports.updateGradoGuia = updateGradoGuia;
