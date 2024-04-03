import "dotenv/config"
import express from "express"
import { createServer } from "http"; // Importa createServer de http
import { Server, Socket } from "socket.io"; // Importa Server y Socket de socket.io
import {router} from "./routes"
const PORT=process.env.PORT || 3000
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))
const cors=require('cors');
app.use(cors({ origin: "*" }));
app.use(router);

const server = createServer(app); // Crea un servidor HTTP usando express
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true
    }
  });
// Estructura de datos para almacenar sockets de usuarios
  const socketsMap = new Map<string, Socket>();

  io.on("connection", (socket: Socket) => {
    io.emit("ruta-detectada-server", { mensaje: 'ruta: ' +__dirname+',  ../assets/img/perfiles/profesores'});
  // Guardar el socket del usuario en el mapa
  socket.on("guardar-socket", (data: any) => {
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
  socket.on("cambio", (data: any) => {
  // Procesar el cambio y emitir notificaciones a todos los usuarios conectados
    io.emit("notificacion", { mensaje: "Se ha realizado un cambio en la aplicación." });
  });

  });
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });

  // Exportar el objeto de Socket.io para usarlo en otros archivos
export {io,socketsMap};