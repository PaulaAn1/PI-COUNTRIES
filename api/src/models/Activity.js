const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('activity', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
                isEven(value) {
                if(value < 1 || value > 5) {
                    throw new Error('Solo valores entre 1 y 5')
                }
                }
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            validate: {
            min: 1,
            max: 24,
            isEven(value) {
                if(value < 1 || value > 24) {
                throw new Error('Solo valores entre 1 y 24')
                }
            }
            }
        },
        season: {
            type: DataTypes.ENUM ('Summer', 'Fall', 'Winter', 'Spring'),
        },
        season2: {
            type: DataTypes.ENUM ('Alta', 'Media', 'Baja'),
        },
        create: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        timestamps: false
    });
};
