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
exports.getSeccionService = exports.getSeccionesService = exports.insertarSeccionService = exports.updateSeccionService = exports.deleteSeccionService = void 0;
const database_1 = __importDefault(require("../config/database"));
const getSeccionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("SELECT idSeccion, seccion FROM tbSeccion WHERE idSeccion=?", [id]);
    return response;
});
exports.getSeccionService = getSeccionService;
const getSeccionesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("SELECT idSeccion, seccion FROM tbSeccion");
    return response;
});
exports.getSeccionesService = getSeccionesService;
const insertarSeccionService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("INSERT INTO tbSeccion SET ?", [data]);
    return response;
});
exports.insertarSeccionService = insertarSeccionService;
const updateSeccionService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("UPDATE tbSeccion SET ? WHERE idSeccion=?", [data, id]);
    return response;
});
exports.updateSeccionService = updateSeccionService;
const deleteSeccionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("DELETE FROM tbSeccion WHERE idSeccion=?", [id]);
    return response;
});
exports.deleteSeccionService = deleteSeccionService;
