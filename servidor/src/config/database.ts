import mysql from 'promise-mysql';
import keys from "./keys"

const conexion=mysql.createPool(keys.database);

conexion.getConnection().then(connection=>{
    conexion.releaseConnection(connection);
    console.log("Conexion Establecida");
});
export default conexion;
 
