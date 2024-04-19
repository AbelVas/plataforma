import "dotenv/config"
import express from "express"
import { createServer } from "http"; // Importa createServer de http
import { Server, Socket } from "socket.io"; // Importa Server y Socket de socket.io
import {router} from "./routes"
import { eliminarSocketTemporal, guardarSocketTemporal } from "./utils/socketsTemp";
import { socketsTemp } from "./utils/socketsTemp";

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

io.on("connection", async(socket: Socket) => {
  socket.on("associateUser", (data: { idUsuario: string,idRol:string,rol:string }) => {
    // Guardar temporalmente el socket con su idUsuario asociado
    guardarSocketTemporal(socket.id, data.idUsuario, data.idRol,data.rol,socket);
  });

  socket.on("disconnect", () => {
    // Eliminar el socket temporalmente guardado al desconectarse
    const socketData = socketsTemp.get(socket.id);
    if (socketData) {
      //eliminarSocketTemporal(socket.id)
      eliminarSocketTemporal(socket.id, socketData.idRol);
    }
  });
});

  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });

  // Exportar el objeto de Socket.io para usarlo en otros archivos
export {io,socketsTemp};