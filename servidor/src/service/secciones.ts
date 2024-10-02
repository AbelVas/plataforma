import conexion from "../config/database";

// Definir una interfaz para las secciones
interface Seccion {
    idSeccion?: string;
    seccion: string;
}

// Obtener una sección por su ID
const getSeccionService = async (id: string): Promise<Seccion | null> => {
    try {
        const response = await conexion.query("SELECT idSeccion, seccion FROM tbSeccion WHERE idSeccion = ?", [id]);
        return response.length ? response[0] : null;
    } catch (error) {
        throw new Error(`Error al obtener la sección con ID: ${id}`);
    }
};

// Obtener todas las secciones
const getSeccionesService = async (): Promise<Seccion[]> => {
    try {
        const response = await conexion.query("SELECT idSeccion, seccion FROM tbSeccion");
        return response;
    } catch (error) {
        throw new Error("Error al obtener las secciones");
    }
};

// Insertar una nueva sección
const insertarSeccionService = async (data: Partial<Seccion>): Promise<any> => {
    try {
        const response = await conexion.query("INSERT INTO tbSeccion SET ?", [data]);
        return response;
    } catch (error) {
        throw new Error("Error al insertar la nueva sección");
    }
};

// Actualizar una sección por su ID
const updateSeccionService = async (id: string, data: Partial<Seccion>): Promise<any> => {
    try {
        const response = await conexion.query("UPDATE tbSeccion SET ? WHERE idSeccion = ?", [data, id]);
        return response;
    } catch (error) {
        throw new Error(`Error al actualizar la sección con ID: ${id}`);
    }
};

// Eliminar una sección por su ID
const deleteSeccionService = async (id: string): Promise<any> => {
    try {
        const response = await conexion.query("DELETE FROM tbSeccion WHERE idSeccion = ?", [id]);
        return response;
    } catch (error) {
        throw new Error(`Error al eliminar la sección con ID: ${id}`);
    }
};

export {
    getSeccionService,
    getSeccionesService,
    insertarSeccionService,
    updateSeccionService,
    deleteSeccionService
};
