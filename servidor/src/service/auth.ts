import { verified } from "../utils/passwordFunction";
import conexion from "../config/database";
import { generateToken } from "../utils/jwt.generador";

// Función auxiliar para verificar usuario en una tabla específica
const verificarUsuario = async (table: string, emailColumn: string, nombreColumn: string, apellidoColumn: string, idColumn: string, conditionColumn: string, email: string) => {
    const query = `
        SELECT ${idColumn} AS idUsuario, ${table}.idRol, ${table}.pass, ${table}.${nombreColumn}, ${table}.${apellidoColumn}, ${table}.${emailColumn} AS usuario, r.rol 
        FROM ${table} 
        INNER JOIN tbRol r ON r.idRol = ${table}.idRol 
        WHERE ${table}.${emailColumn} = ? AND ${table}.${conditionColumn} = '1' 
        GROUP BY ${idColumn};
    `;
    const result = await conexion.query(query, [email]);
    return result.length ? result[0] : null;
};

// Función auxiliar para procesar el login y generar token
const procesarLogin = async (usuario: any, password: string, nombreKey: string, apellidoKey: string) => {
    const passwordHash = usuario.pass;
    const isCorrect = await verified(password, passwordHash);
    if (!isCorrect) return "Usuario o Contraseña Incorrecta";

    // Generar el token
    const token = generateToken(usuario.idUsuario, usuario.idRol, usuario[nombreKey], usuario[apellidoKey], usuario.rol);

    // Preparar los datos del usuario sin la contraseña
    delete usuario.pass;
    return {
        token,
        user: [usuario]
    };
};

const loginUser = async (email: string, password: string) => {
    // Intentar encontrar al usuario en las diferentes tablas
    let usuario = await verificarUsuario('tbProfesor', 'usuario', 'nombre_profesor', 'apellido_profesor', 'idProfesor', 'estatus', email);

    if (!usuario) {
        usuario = await verificarUsuario('tbTutor', 'usuario', 'nombre_tutor', 'apellido_tutor', 'idTutor', 'estado', email);
    }

    if (!usuario) {
        usuario = await verificarUsuario('tbAlumno', 'usuario', 'nombres_alumno', 'apellidos_alumno', 'idAlumno', 'activo', email);
    }

    // Si no se encontró el usuario en ninguna tabla
    if (!usuario) {
        return "Usuario o Contraseña Incorrecta";
    }

    // Procesar el login según el tipo de usuario (profesor, tutor o alumno)
    if (usuario.idRol === 1 || usuario.idRol === 2) {
        return procesarLogin(usuario, password, 'nombre_profesor', 'apellido_profesor');
    } else if (usuario.idRol === 3) {
        return procesarLogin(usuario, password, 'nombre_tutor', 'apellido_tutor');
    } else {
        return procesarLogin(usuario, password, 'nombres_alumno', 'apellidos_alumno');
    }
};

export { loginUser };
