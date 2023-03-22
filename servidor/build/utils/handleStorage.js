"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.uploadMiddleware = void 0;
const multer_1 = __importStar(require("multer"));
const database_1 = __importDefault(require("../config/database"));
var rutapadre;
var rutahijo = `/assets/img`;
var rutaimagen;
const storage = (0, multer_1.diskStorage)({
    destination: function (req, file, cb) {
        //rutapadre = `${__dirname}`;
        const rutafinal = rutapadre + rutahijo;
        cb(null, rutafinal);
    },
    filename: function (req, file, cb) {
        const { nombre } = req.params;
        const ext = file.originalname.split(".").pop();
        const filename = `${nombre + '-' + Date.now() + '-' + file.originalname}`;
        const imagenperfil = (rutabd) => __awaiter(this, void 0, void 0, function* () {
            const update = yield database_1.default.query("UPDATE tbProfesor set imagen = ? WHERE idProfesor = ?", [rutabd, nombre]);
        });
        const ruta = rutahijo + filename;
        imagenperfil(ruta);
        cb(null, filename);
    }
});
const uploadMiddleware = (0, multer_1.default)({ storage });
exports.uploadMiddleware = uploadMiddleware;
