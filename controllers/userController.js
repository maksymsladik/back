const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Auth } = require("../models/models");
const { Role } = require("../models/models");
const { Article } = require("../models/models");

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_PRIVATEKEY, {
    expiresIn: "1h",
  });
};

const register = async function (req, res) {
  try {
    const { email, password, name, surname, age } = req.body;

    if (!email || !password || !name || !surname || !age) {
      return res.json({
        status: false,
        message: "Введите данные.",
      });
    }

    const candidate = await Auth.findOne({ where: { email } });

    if (candidate) {
      return res.json({
        status: false,
        message: "Увы, пользователь уже существует.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Auth.create({
      email,
      password: hashedPassword,
      name,
      surname,
      age,
      roleId: 2,
    });

    const token = generateJWT(user.id, user.email, user.roleId);

    res.json({
      status: true,
      message: "Поздравляем, Вы успешно прошли процесс регистрации.",
      data: user.dataValues,
      userToken: `Bearer ${token}`,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        status: false,
        message: "Введите данные.",
      });
    }

    const user = await Auth.findOne({ where: { email } });

    if (!user) {
      return res.json({
        status: false,
        message: "Увы, неверный email.",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.json({
        status: false,
        message: "Увы, неверный пароль.",
      });
    }

    const token = generateJWT(user.id, user.email, user.roleId);

    res.json({
      status: true,
      message: "Поздравляем, Вы успешно прошли процесс авторизации.",
      data: user.dataValues,
      userToken: `Bearer ${token}`,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const check = async function (req, res) {
  try {
    const token = generateJWT(req.user.id, req.user.email, req.user.roleId);

    res.json({
      status: true,
      message: "Поздравляем, Вы успешно прошли процесс аутентификации.",
      userToken: `Bearer ${token}`,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const writer = async function (req, res) {
  try {
    const user = await Auth.findAll({
      where: { id: req.user.id },
      include: [
        {
          model: Article,
        },
      ],
    });

    res.json({
      status: true,
      message: "Данные пользователя готовы.",
      data: user,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteWriter = async function (req, res) {
  try {
    await Auth.destroy({ where: { id: req.params.id } });

    res.json({
      status: true,
      message: "Вы успешно удалили пользователя",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  register,
  login,
  check,
  writer,
  deleteWriter,
};
