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
exports.CrearForo = exports.EliminarForo = exports.EditarForo = exports.ObtenerForosCurso = exports.ObtenerForo = void 0;
const database_1 = __importDefault(require("../config/database"));
const CrearForo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('INSERT INTO tbForo set ?', [data]);
});
exports.CrearForo = CrearForo;
const ObtenerForo = (idForo) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT * FROM tbForo WHERE idForo=?', [idForo]);
    return responseGet;
});
exports.ObtenerForo = ObtenerForo;
const ObtenerForosCurso = (idCurso) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT * FROM tbForo f INNER JOIN tbUnidad u ON u.idUnidad = f.idUnidad WHERE f.idCurso=? and u.estado = 1', [idCurso]);
    return responseGet;
});
exports.ObtenerForosCurso = ObtenerForosCurso;
const EditarForo = (data, idForo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('UPDATE tbForo SET ? WHERE idForo=?', [data, idForo]);
    return response;
});
exports.EditarForo = EditarForo;
const EliminarForo = (idForo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('DELETE FROM tbForo WHERE idForo=?', [idForo]);
    return response;
});
exports.EliminarForo = EliminarForo;
