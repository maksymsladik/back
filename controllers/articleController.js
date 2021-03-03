const { Article } = require("../models/models");

const getArticles = async function (req, res) {
  try {
    const articles = await Article.findAll();

    res.status(200).json(articles);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getWriterArticles = async function (req, res) {
  try {
    const articles = await Article.findAll({ where: { userId: req.user.id } });

    res.json(articles);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getArticle = async function (req, res) {
  try {
  } catch (e) {
    res.status(500).json(e);
  }
};

const createArticle = async function (req, res) {
  try {
    const { id } = req.user;
    const { title, description } = req.body;

    const article = await Article.create({ title, description, userId: id });

    res.json({
      status: true,
      message: "Вы успешно создали статью",
      data: article,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const updateArticle = async function (req, res) {
  try {
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteArticle = async function (req, res) {
  try {
    await Article.destroy({ where: { id: req.params.id } });

    res.json({
      status: true,
      message: "Вы успешно удалили статью",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteArticles = async function (req, res) {
  try {
    await Article.destroy({ where: { userId: req.user.id } });

    res.json({
      status: true,
      message: "Вы успешно удалили статьи",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  getArticles,
  getWriterArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  deleteArticles,
};
