const express = require("express");
const passport = require("passport");
require("dotenv").config();
const { sequelize } = require("./db");
const { passportJWT } = require("./middleware/passport");

const app = express();

app.use(require("cors")());
app.use(express.json());
app.use("/api", require("./routes/index"));
app.use(passport.initialize());
passportJWT(passport);

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Порт подключения...${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
