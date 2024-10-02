import conexion from "../config/database";

// Definimos un tipo para representar una jornada
interface Jornada {
    idJornada?: string;
    jornada: string;
    creada: Date;  // Asegúrate de que este tipo sea correcto (por ejemplo, si es una fecha)
    activo: string;  // Considera cambiarlo a boolean si tiene sentido
}

// Obtener todas las jornadas
const obtenerJornadasService = async (): Promise<Jornada[]> => {
    try {
        const responseGet = await conexion.query('SELECT idJornada, jornada, creada, activo FROM tbJornada');
        return responseGet;
    } catch (error) {
        throw new Error('Error al obtener las jornadas');
    }
};

// Obtener una jornada por su ID
const obtenerJornadaService = async (id: string): Promise<Jornada | null> => {
    try {
        const responseGet = await conexion.query('SELECT idJornada, jornada, creada, activo FROM tbJornada WHERE idJornada = ?', [id]);
        return responseGet.length ? responseGet[0] : null;
    } catch (error) {
        throw new Error(`Error al obtener la jornada con ID: ${id}`);
    }
};

// Actualizar una jornada
const updateJornadaService = async (data: Partial<Jornada>, id: string): Promise<any> => {
    try {
        const responseUpdate = await conexion.query('UPDATE tbJornada SET ? WHERE idJornada = ?', [data, id]);
        return responseUpdate;
    } catch (error) {
        throw new Error(`Error al actualizar la jornada con ID: ${id}`);
    }
};

// Eliminar una jornada
const deleteJornadaService = async (id: string): Promise<any> => {
    try {
        const responseDelete = await conexion.query('DELETE FROM tbJornada WHERE idJornada = ?', [id]);
        return responseDelete;
    } catch (error) {
        throw new Error(`Error al eliminar la jornada con ID: ${id}`);
    }
};

// Insertar una nueva jornada
const insertJornadaService = async (data: Partial<Jornada>): Promise<any> => {
    try {
        const responseInsert = await conexion.query('INSERT INTO tbJornada SET ?', [data]);
        return responseInsert;
    } catch (error) {
        throw new Error('Error al insertar una nueva jornada');
    }
};

export {
    obtenerJornadasService,
    obtenerJornadaService,
    updateJornadaService,
    deleteJornadaService,
    insertJornadaService
};
