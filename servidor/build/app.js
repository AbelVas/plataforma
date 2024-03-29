"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = require("http"); // Importa createServer de http
const socket_io_1 = require("socket.io"); // Importa Server y Socket de socket.io
const routes_1 = require("./routes");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
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
io.on("connection", (socket) => {
    // Escuchar eventos desde el cliente a través de Socket.io
    socket.on("evento-desde-cliente", (data) => {
        console.log("Evento recibido desde el cliente:", data);
        // Emitir un evento de vuelta al cliente
        io.emit("evento-desde-servidor", { mensaje: "Hola desde el servidor" });
    });
});
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
