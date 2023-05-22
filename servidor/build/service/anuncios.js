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
exports.GetAnuncioServiceGrado = exports.insertAnuncioService = exports.deleteAnuncioService = exports.updateAnuncioService = exports.GetAnuncioService = exports.GetAnunciosService = void 0;
const database_1 = __importDefault(require("../config/database"));
const GetAnunciosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT * FROM tbAnuncio');
    return responseGet;
});
exports.GetAnunciosService = GetAnunciosService;
const GetAnuncioService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT * FROM tbAnuncio WHERE idAnuncio=?', [id]);
    return responseGet;
});
exports.GetAnuncioService = GetAnuncioService;
const updateAnuncioService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbAnuncio SET ? WHERE idAnuncio=?', [data, id]);
    return responseUpdate;
});
exports.updateAnuncioService = updateAnuncioService;
const deleteAnuncioService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbAnuncio WHERE idAnuncio=?', [id]);
    return responseDelete;
});
exports.deleteAnuncioService = deleteAnuncioService;
const insertAnuncioService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbAnuncio set ?', [data]);
    return responseInsert;
});
exports.insertAnuncioService = insertAnuncioService;
const GetAnuncioServiceGrado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT a.idAnuncio,a.idCurso,a.nombre_anuncio,a.anuncio,u.unidad FROM tbAnuncio a INNER JOIN tbUnidad u on a.idUnidad=u.idUnidad WHERE a.idCurso=?', [id]);
    return responseGet;
});
exports.GetAnuncioServiceGrado = GetAnuncioServiceGrado;
