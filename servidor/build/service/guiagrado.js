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
exports.getGuiaPorGuia = exports.getGraGuiaService = exports.insertGraGuiaService = exports.deleteGraGuiaService = exports.updateGraGuiaService = void 0;
const database_1 = __importDefault(require("../config/database"));
// insertar, editar y eliminar tbGuiaGrado
const updateGraGuiaService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbGuiaGrado SET ? WHERE idGuias=?', [data, id]);
    return responseUpdate;
});
exports.updateGraGuiaService = updateGraGuiaService;
const deleteGraGuiaService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbGuiaGrado WHERE idGuias=?', [id]);
    return responseDelete;
});
exports.deleteGraGuiaService = deleteGraGuiaService;
const insertGraGuiaService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbGuiaGrado set ?', [data]);
    return responseInsert;
});
exports.insertGraGuiaService = insertGraGuiaService;
//Por mientras tengo el get
const getGraGuiaService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT * FROM tbGuiaGrado');
    return responseGet;
});
exports.getGraGuiaService = getGraGuiaService;
const getGuiaPorGuia = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT gg.idProfesor,g.nombre_grado,g.idGrado,p.nombre_profesor,p.apellido_profesor FROM (tbGuiaGrado gg INNER JOIN tbGrado g ON gg.idGrado=g.idGrado)INNER JOIN tbProfesor p ON p.idProfesor=gg.idProfesor WHERE g.idGrado=?', [id]);
    return responseGet;
});
exports.getGuiaPorGuia = getGuiaPorGuia;
