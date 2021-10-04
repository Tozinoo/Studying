const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId: {
                    type: Sequelize.STRING(30),
                    primaryKey: true,
                    allowNull: false,
                },
                userPwd: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                userName: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                userTel: {
                    type: Sequelize.STRING(14),
                    allowNull: true,
                },
                userMail: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                userAddr: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                level: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: "1",
                },
                userCreated: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "user",
                tableName: "users",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Oclass, {
            foreignKey: "userId",
            sourceKey: "userId",
        });
    }
};
