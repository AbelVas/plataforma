import "dotenv/config"
import express from "express"
import cors from "cors"
import {router} from "./routes"


const PORT=process.env.PORT || 3000
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors(
    //acá se puede determinar que origenes y que no se puede conectar a nuestra api o consumir sus recursos
));

app.use(router);
app.listen(PORT,()=>console.log(`Listo en el Puerto: ${PORT}`))
