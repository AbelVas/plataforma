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
exports.inserttipocodigoService = exports.deletetipocodigoService = exports.updatetipocodigoService = exports.obtenertipocodigoService = exports.obtenertiposcodigoService = void 0;
const database_1 = __importDefault(require("../config/database"));
const obtenertiposcodigoService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT * FROM tbTipoCodigo');
    return responseGet;
});
exports.obtenertiposcodigoService = obtenertiposcodigoService;
const obtenertipocodigoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT * FROM tbTipoCodigo WHERE idTipoCodigo=?', [id]);
    return responseGet;
});
exports.obtenertipocodigoService = obtenertipocodigoService;
const updatetipocodigoService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbTipoCodigo SET ? WHERE idTipoCodigo=?', [data, id]);
    return responseUpdate;
});
exports.updatetipocodigoService = updatetipocodigoService;
const deletetipocodigoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbTipoCodigo WHERE idTipoCodigo=?', [id]);
    return responseDelete;
});
exports.deletetipocodigoService = deletetipocodigoService;
const inserttipocodigoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbTipoCodigo SET ?', [data]);
    responseInsert;
});
exports.inserttipocodigoService = inserttipocodigoService;