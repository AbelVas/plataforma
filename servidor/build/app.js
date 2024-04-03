"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketsMap = exports.io = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = require("http"); // Importa createServer de http
const socket_io_1 = require("socket.io"); // Importa Server y Socket de socket.io
const routes_1 = require("./routes");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
const cors = require('cors');
app.use(cors({ origin: "*" }));
app.use(routes_1.router);
const server = (0, http_1.createServer)(app); // Crea un servidor HTTP usando express
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});
exports.io = io;
// Estructura de datos para almacenar sockets de usuarios
const socketsMap = new Map();
exports.socketsMap = socketsMap;
io.on("connection", (socket) => {
    io.emit("ruta-detectada-server", { mensaje: 'ruta: ' + __dirname + ',  ../assets/img/perfiles/profesores' });
    // Guardar el socket del usuario en el mapa
    socket.on("guardar-socket", (data) => {
        const { idUsuario } = data;
        socketsMap.set(idUsuario, socket);
        console.log("Socket guardado para el usuario:", idUsuario);
    });
    //para desconectar y eliminar lo guardadao
    socket.on("disconnect", () => {
        // Eliminar el socket del usuario al desconectarse
        console.log("Usuario desconectado:", socket.id);
        socketsMap.forEach((value, key) => {
            if (value === socket) {
                socketsMap.delete(key);
                console.log("Socket eliminado para el usuario:", key);
            }
        });
    });
    // Ejemplo de manejo de cambios simultáneos
    socket.on("cambio", (data) => {
        // Procesar el cambio y emitir notificaciones a todos los usuarios conectados
        io.emit("notificacion", { mensaje: "Se ha realizado un cambio en la aplicación." });
    });
});
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
