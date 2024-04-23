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
exports.socketsTemp = exports.io = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = require("http"); // Importa createServer de http
const socket_io_1 = require("socket.io"); // Importa Server y Socket de socket.io
const routes_1 = require("./routes");
const socketsTemp_1 = require("./utils/socketsTemp");
const socketsTemp_2 = require("./utils/socketsTemp");
Object.defineProperty(exports, "socketsTemp", { enumerable: true, get: function () { return socketsTemp_2.socketsTemp; } });
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
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("associateUser", (data) => {
        // Guardar temporalmente el socket con su idUsuario asociado
        (0, socketsTemp_1.guardarSocketTemporal)(socket.id, data.idUsuario, data.idRol, data.rol, socket);
    });
    socket.on("disconnect", () => {
        // Eliminar el socket temporalmente guardado al desconectarse
        const socketData = socketsTemp_2.socketsTemp.get(socket.id);
        if (socketData) {
            //eliminarSocketTemporal(socket.id)
            (0, socketsTemp_1.eliminarSocketTemporal)(socket.id, socketData.idRol);
        }
    });
}));
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
