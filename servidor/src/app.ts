import "dotenv/config"
import express from "express"
import { createServer } from "http"; // Importa createServer de http
import { Server, Socket } from "socket.io"; // Importa Server y Socket de socket.io
import {router} from "./routes"
const PORT=process.env.PORT || 3000
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
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

  io.on("connection", (socket: Socket) => {
   
    // Escuchar eventos desde el cliente a través de Socket.io
    socket.on("evento-desde-cliente", (data: any) => {
      console.log("Evento recibido desde el cliente:", data);
  
      // Emitir un evento de vuelta al cliente
      io.emit("evento-desde-servidor", { mensaje: "Hola desde el servidor" });
    });
  });
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });

  // Exportar el objeto de Socket.io para usarlo en otros archivos
export {io};