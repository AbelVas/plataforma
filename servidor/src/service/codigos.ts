import conexion from "../config/database";

// Definir una interfaz para el código
interface Codigo {
    idCodigo?: string;
    codigo: string;
    idTipoCodigo: string;
    fecha_creado?: string;
    activo: boolean;
}

// Obtener todos los códigos
const obtenerCodigosService = async (): Promise<Codigo[]> => {
    try {
        const responseGet = await conexion.query(`
            SELECT c.idCodigo, c.codigo, t.tipo, c.fecha_creado, c.activo 
            FROM tbCodigo c 
            INNER JOIN tbTipoCodigo t ON t.idTipoCodigo = c.idTipoCodigo 
            ORDER BY t.tipo, c.codigo
        `);
        return responseGet;
    } catch (error) {
        throw new Error("Error al obtener los códigos");
    }
};

// Obtener un código específico por su valor y tipo
const obtenerCodigoService = async (codigo: string, idTipoCodigo: string): Promise<Codigo | false> => {
    try {
        const responseGet = await conexion.query(
            'SELECT idCodigo FROM tbCodigo WHERE codigo = ? AND activo = 1 AND idTipoCodigo = ?',
            [codigo, idTipoCodigo]
        );
        return responseGet.length ? responseGet[0] : false;
    } catch (error) {
        throw new Error("Error al obtener el código");
    }
};

// Actualizar un código por su ID
const updateCodigoService = async (data: Partial<Codigo>, id: string): Promise<any> => {
    try {
        const responseUpdate = await conexion.query('UPDATE tbCodigo SET ? WHERE idCodigo = ?', [data, id]);
        return responseUpdate;
    } catch (error) {
        throw new Error(`Error al actualizar el código con ID: ${id}`);
    }
};

// Eliminar un código por su ID
const deleteCodigoService = async (id: string): Promise<any> => {
    try {
        const responseDelete = await conexion.query('DELETE FROM tbCodigo WHERE idCodigo = ?', [id]);
        return responseDelete;
    } catch (error) {
        throw new Error(`Error al eliminar el código con ID: ${id}`);
    }
};

// Insertar un nuevo código
const insertCodigoService = async (data: Partial<Codigo>): Promise<any> => {
    try {
        const responseInsert = await conexion.query('INSERT INTO tbCodigo SET ?', [data]);
        return responseInsert;
    } catch (error) {
        throw new Error("Error al insertar el código");
    }
};

export {
    obtenerCodigoService,
    obtenerCodigosService,
    updateCodigoService,
    deleteCodigoService,
    insertCodigoService
};
