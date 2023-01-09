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
exports.insertRecursoWebService = exports.deleteRecursoWebService = exports.updateRecursoWebService = exports.GetRecursoWebService = exports.GetRecursosWebService = void 0;
const database_1 = __importDefault(require("../config/database"));
//insertar, editar, obtener al cuadrado y eliminar tbrecurso web
// id: "idtbRecursoVideo"
const GetRecursosWebService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT * FROM tbRecursoWeb');
    return responseGet;
});
exports.GetRecursosWebService = GetRecursosWebService;
const GetRecursoWebService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT * FROM tbRecursoWeb WHERE idtbRecursoVideo=?', [id]);
    return responseGet;
});
exports.GetRecursoWebService = GetRecursoWebService;
const updateRecursoWebService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbRecursoWeb SET ? WHERE idtbRecursoVideo=?', [data, id]);
    return responseUpdate;
});
exports.updateRecursoWebService = updateRecursoWebService;
const deleteRecursoWebService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbRecursoWeb WHERE idtbRecursoVideo=?', [id]);
    return responseDelete;
});
exports.deleteRecursoWebService = deleteRecursoWebService;
const insertRecursoWebService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbRecursoWeb set ?', [data]);
    return responseInsert;
});
exports.insertRecursoWebService = insertRecursoWebService;
