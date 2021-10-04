const Sequelize = require("sequelize");

module.exports = class Admin extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                adminId: {
                    type: Sequelize.STRING(30),
                    primaryKey: true,
                    allowNull: false,
                },
                adminPwd: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                adminName: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                adminTel: {
                    type: Sequelize.STRING(14),
                    allowNull: false,
                },
                adminMail: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                level: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: true,
                    defaultValue: "3",
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "admin",
                tableName: "admins",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Admin.hasMany(db.Notice, {
            foreignKey: "adminId",
            sourceKey: "adminId",
        });
    }
};
