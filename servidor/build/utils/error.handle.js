"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttp = exports.ConflictError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.ValidationError = void 0;
// Define tipos de errores personalizados
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400); // Código de estado 400 para Bad Request
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404); // Código de estado 404 para Not Found
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message, 401); // Código de estado 401 para Unauthorized
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, 403); // Código de estado 403 para Forbidden
    }
}
exports.ForbiddenError = ForbiddenError;
class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409); // Código de estado 409 para Conflict
    }
}
exports.ConflictError = ConflictError;
// Middleware handleHttp mejorado
const handleHttp = (error, req, res) => {
    console.error(error); // Loguea el error en la consola para propósitos de debugging
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Establece el código de estado HTTP por defecto
    // Manejo de códigos de estado específicos
    if (error instanceof CustomError) {
        statusCode = error.statusCode;
    }
    else if (error.name === 'ValidationError') {
        statusCode = 400; // Bad Request
    }
    else if (error.name === 'NotFoundError') {
        statusCode = 404; // Not Found
    }
    else if (error.name === 'UnauthorizedError') {
        statusCode = 401; // Unauthorized
    }
    else if (error.name === 'ForbiddenError') {
        statusCode = 403; // Forbidden
    }
    else if (error.name === 'ConflictError') {
        statusCode = 409; // Conflict
    } // Puedes seguir agregando más condiciones según necesites
    // Envía la respuesta al frontend con el mensaje de error específico y el código de estado correspondiente
    res.status(statusCode).json({
        error: error.message || 'Error interno del servidor',
        stack: process.env.NODE_ENV === 'production' ? 'Error stack trace no disponible en producción' : error.stack,
    });
};
exports.handleHttp = handleHttp;
