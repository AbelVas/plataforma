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
exports.sidebarServiceAdminOptions = void 0;
const database_1 = __importDefault(require("../config/database"));
const sidebarServiceAdminOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT nombre_modulo, ruta, icono, activo FROM tbMenuOptions WHERE idModulo=1 and activo=1');
    return response;
});
exports.sidebarServiceAdminOptions = sidebarServiceAdminOptions;
