module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        id: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true
    })
);