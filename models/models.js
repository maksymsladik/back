const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// =============================================================

const Role = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    require: true,
  },
});

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
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  surname: {
    type: DataTypes.STRING,
    require: true,
  },
  age: {
    type: DataTypes.STRING,
    require: true,
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
  short_description: {
    type: DataTypes.STRING,
    require: true,
  },
  article: {
    type: DataTypes.STRING,
    require: true,
  },
});

// =============================================================

Role.hasMany(Auth);
Auth.belongsTo(Role);

Auth.hasMany(Article, { onDelete: "cascade" });
Article.belongsTo(Auth);

// =============================================================

module.exports = {
  Role,
  Auth,
  Article,
};
