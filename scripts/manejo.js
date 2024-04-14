const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');


// Definir el modelo de la tabla Cancion

const Cancion = sequelize.define('canciones', {
 
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     notEmpty: {
        //         msg: "Debes proporcionar un título para la canción"
        //     },
        //     len: {
        //         args: [1, 50],
        //         msg: "El largo es entre 1 y 50 caracteres"
        //     }
        // }
    },
    artista: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     notEmpty: {
        //         msg: "Debes ingresar un artista para la canción"
        //     },
        //     len: {
        //         args: [1, 50],
        //         msg: "El nombre del artista debe tener entre 1 y 50 caracteres"
        //     }
        // }
    },
    tono: {
        type: DataTypes.STRING(10),
        // validate: {
        //     acorde_Valido(value) {
        //         const acordesValidos = ['C','C#','D','D#','E'
        //         ,'F','F#','G','G#','A','A#','B'];
        //         if (!acordesValidos.includes(value)) {
        //             throw new Error("Error interno: tono inválido");
        //         }
        //     }
        // }
    },
}, {
    timestamps: false,
    tableName: 'canciones'
});

module.exports = Cancion
    
