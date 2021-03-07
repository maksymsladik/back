# SEED

статья: https://sequelize.org/master/manual/migrations.html

1. установка: npm install --save-dev sequelize-cli
2. инициализация: npx sequelize-cli init
3. создание файла: npx sequelize-cli seed:generate --name <--name of seed file-->

# файл seeder:

===============================================================

module.exports = {
up: (queryInterface, Sequelize) => {
return queryInterface.bulkInsert("roles", [
{
id: 1,
name: "ADMIN",
createdAt: new Date(),
updatedAt: new Date(),
},
{
id: 2,
name: "USER",
createdAt: new Date(),
updatedAt: new Date(),
},
]);
},

down: async (queryInterface, Sequelize) => {
/_ return queryInterface.bulkDelete("roles", null, {}); _/
},
};
===============================================================

4. заполнить таблицу: npx sequelize-cli db:seed --seed <--name of seed file-->
5. очистить таблицу: npx sequelize-cli db:seed:undo --seed <--name of seed file-->
