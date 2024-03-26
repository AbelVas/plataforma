import "dotenv/config"
import express from "express"
import {router} from "./routes"
import { Server} from "socket.io"
import {createServer} from 'node:http'
const PORT=process.env.PORT || 3000
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const cors=require('cors');
app.use(cors({origin: "*", //servidor que deseas que consuma o (*) en caso que sea acceso libre
}));

const server=createServer(app)
//const httpServer=server.listen(PORT)
const io=new Server(server,{cors:{
    origin:"*"
}})

//así se hace la comunicación, seguir buscando como adaprtar eso a las insersiones SQL
io.on('connection',function(socket){
    console.log("Coneccion de usuario: ",socket.id)
    socket.emit('test-event',"Aloja")
})

server.listen(PORT)
app.use(router);

