const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Auth } = require("../models/models");
const { Article } = require("../models/models");

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_PRIVATEKEY, {
    expiresIn: "1h",
  });
};

const register = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
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

    const user = await Auth.create({ email, password: hashedPassword });

    const token = generateJWT(user.id, user.email, user.role);

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

    const token = generateJWT(user.id, user.email, user.role);

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
    const token = generateJWT(req.user.id, req.user.email, req.user.role);

    res.json({
      status: true,
      message: "Поздравляем, Вы успешно прошли процесс аутентификации.",
      userToken: `Bearer ${token}`,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const writers = async function (req, res) {
  try {
    const users = await Auth.findAll({
      where: {},
      include: [
        {
          model: Article,
          where: {},
        },
      ],
    });

    res.json({
      status: true,
      message: "Список всех пользователей",
      data: users,
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
  writers,
  deleteWriter,
};
