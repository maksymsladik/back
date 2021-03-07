const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        email: "admin@gmail.com",
        password: await bcrypt.hash("admin", 10),
        name: "Admin",
        surname: "Admin",
        age: "18",
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: "1",
      },
      {
        id: 2,
        email: "sladik_maksym@gmail.com",
        password: await bcrypt.hash("RrLEKkwPXM1992", 10),
        name: "Maksym",
        surname: "Sladik",
        age: "28",
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: "2",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
