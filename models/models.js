const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// =============================================================

const Auth = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
  },
});

// =============================================================

const Article = sequelize.define("articles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    require: true,
  },
  description: {
    type: DataTypes.STRING,
    require: true,
  },
});

// =============================================================

Auth.hasMany(Article, { onDelete: "cascade" });
Article.belongsTo(Auth);

// =============================================================

module.exports = {
  Auth,
  Article,
};
