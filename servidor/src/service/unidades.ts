import conexion from "../config/database";

// Definir la interfaz de Unidad
interface Unidad {
    idUnidad?: string;
    unidad: string;
    fecha_inicio: Date;
    fecha_final: Date;
    estado: string;  // Podrías usar boolean si tiene sentido
}

// Insertar una nueva unidad
const insertUnidadService = async (dato: Partial<Unidad>): Promise<any> => {
    try {
        const responseInsert = await conexion.query('INSERT INTO tbUnidad SET ?', [dato]);
        return responseInsert;
    } catch (error) {
        throw new Error("Error al insertar la unidad");
    }
};

// Obtener todas las unidades
const obtenerUnidadesService = async (): Promise<Unidad[]> => {
    try {
        const responseGet = await conexion.query('SELECT idUnidad, unidad, fecha_inicio, fecha_final, estado FROM tbUnidad');
        return responseGet;
    } catch (error) {
        throw new Error("Error al obtener las unidades");
    }
};

// Obtener una unidad por su ID
const obtenerUnidadService = async (id: string): Promise<Unidad | null> => {
    try {
        const responseGet = await conexion.query('SELECT idUnidad, unidad, fecha_inicio, fecha_final, estado FROM tbUnidad WHERE idUnidad = ?', [id]);
        return responseGet.length ? responseGet[0] : null;
    } catch (error) {
        throw new Error(`Error al obtener la unidad con ID: ${id}`);
    }
};

// Actualizar una unidad por su ID
const updateUnidadService = async (dato: Partial<Unidad>, id: string): Promise<any> => {
    try {
        const responseUpdate = await conexion.query('UPDATE tbUnidad SET ? WHERE idUnidad = ?', [dato, id]);
        return responseUpdate;
    } catch (error) {
        throw new Error(`Error al actualizar la unidad con ID: ${id}`);
    }
};

// Eliminar una unidad por su ID
const deleteUnidadService = async (id: string): Promise<any> => {
    try {
        const responseDelete = await conexion.query('DELETE FROM tbUnidad WHERE idUnidad = ?', [id]);
        return responseDelete;
    } catch (error) {
        throw new Error(`Error al eliminar la unidad con ID: ${id}`);
    }
};

// Obtener todas las unidades activas
const getUnidadesActivasService = async (): Promise<Unidad[]> => {
    try {
        const responseGet = await conexion.query('SELECT idUnidad, unidad FROM tbUnidad WHERE estado = 1');
        return responseGet;
    } catch (error) {
        throw new Error("Error al obtener las unidades activas");
    }
};

export {
    insertUnidadService,
    obtenerUnidadesService,
    obtenerUnidadService,
    updateUnidadService,
    deleteUnidadService,
    getUnidadesActivasService
};
