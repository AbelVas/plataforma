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
exports.deleteTemaService = exports.updateTemaService = exports.insertarTemaService = exports.getTemaActivoService = exports.getTemasService = exports.getTemaService = void 0;
const database_1 = __importDefault(require("../config/database"));
const getTemaService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("SELECT idTema, nombre_tema, navbar1, navbar2, fondo1, fondo2, texto1, texto2, estado FROM tbTema WHERE idTema=?", [id]);
    return response;
});
exports.getTemaService = getTemaService;
const getTemaActivoService = (activo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("SELECT idTema, nombre_tema, navbar1, navbar2, fondo1, fondo2, texto1, texto2, estado FROM tbTema WHERE estado=?", [activo]);
    return response;
});
exports.getTemaActivoService = getTemaActivoService;
const getTemasService = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("SELECT * FROM tbTema");
    return response;
});
exports.getTemasService = getTemasService;
const insertarTemaService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("INSERT INTO tbTema SET ?", [data]);
    return response;
});
exports.insertarTemaService = insertarTemaService;
const updateTemaService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("UPDATE tbTema SET ? WHERE idTema=?", [data, id]);
    return response;
});
exports.updateTemaService = updateTemaService;
const deleteTemaService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("DELETE FROM tbTema WHERE idTema=?", [id]);
    return response;
});
exports.deleteTemaService = deleteTemaService;
