import "dotenv/config"
import express from "express"
import http from 'http'
import {router} from "./routes"
import { Server as WebSocketServer} from "socket.io"
const PORT=process.env.PORT || 3000
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
const cors=require('cors');
app.use(cors(
    //acá se puede determinar que origenes y que no se puede conectar a nuestra api o consumir sus recursos
));


const server=http.createServer(app)
const httpServer=server.listen(PORT)
const io=new WebSocketServer(server)

app.use(router);

