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
exports.loginUser = void 0;
const passwordFunction_1 = require("../utils/passwordFunction");
const database_1 = __importDefault(require("../config/database"));
const jwt_generador_1 = require("../utils/jwt.generador");
// Función auxiliar para verificar usuario en una tabla específica
const verificarUsuario = (table, emailColumn, nombreColumn, apellidoColumn, idColumn, conditionColumn, email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        SELECT ${idColumn} AS idUsuario, ${table}.idRol, ${table}.pass, ${table}.${nombreColumn}, ${table}.${apellidoColumn}, ${table}.${emailColumn} AS usuario, r.rol 
        FROM ${table} 
        INNER JOIN tbRol r ON r.idRol = ${table}.idRol 
        WHERE ${table}.${emailColumn} = ? AND ${table}.${conditionColumn} = '1' 
        GROUP BY ${idColumn};
    `;
    const result = yield database_1.default.query(query, [email]);
    return result.length ? result[0] : null;
});
// Función auxiliar para procesar el login y generar token
const procesarLogin = (usuario, password, nombreKey, apellidoKey) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordHash = usuario.pass;
    const isCorrect = yield (0, passwordFunction_1.verified)(password, passwordHash);
    if (!isCorrect)
        return "Usuario o Contraseña Incorrecta";
    // Generar el token
    const token = (0, jwt_generador_1.generateToken)(usuario.idUsuario, usuario.idRol, usuario[nombreKey], usuario[apellidoKey], usuario.rol);
    // Preparar los datos del usuario sin la contraseña
    delete usuario.pass;
    return {
        token,
        user: [usuario]
    };
});
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Intentar encontrar al usuario en las diferentes tablas
    let usuario = yield verificarUsuario('tbProfesor', 'usuario', 'nombre_profesor', 'apellido_profesor', 'idProfesor', 'estatus', email);
    if (!usuario) {
        usuario = yield verificarUsuario('tbTutor', 'usuario', 'nombre_tutor', 'apellido_tutor', 'idTutor', 'estado', email);
    }
    if (!usuario) {
        usuario = yield verificarUsuario('tbAlumno', 'usuario', 'nombres_alumno', 'apellidos_alumno', 'idAlumno', 'activo', email);
    }
    // Si no se encontró el usuario en ninguna tabla
    if (!usuario) {
        return "Usuario o Contraseña Incorrecta";
    }
    // Procesar el login según el tipo de usuario (profesor, tutor o alumno)
    if (usuario.idRol === 1 || usuario.idRol === 2) {
        return procesarLogin(usuario, password, 'nombre_profesor', 'apellido_profesor');
    }
    else if (usuario.idRol === 3) {
        return procesarLogin(usuario, password, 'nombre_tutor', 'apellido_tutor');
    }
    else {
        return procesarLogin(usuario, password, 'nombres_alumno', 'apellidos_alumno');
    }
});
exports.loginUser = loginUser;
