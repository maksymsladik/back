const { Article } = require("../models/models");

const getArticles = async function (req, res) {
  try {
    const articles = await Article.findAll();

    res.json(articles);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getArticle = async function (req, res) {
  try {
    const article = await Article.findAll({ where: { id: req.params.id } });

    res.json(article);
  } catch (e) {
    res.status(500).json(e);
  }
};

const createArticle = async function (req, res) {
  try {
    const { id } = req.user;
    const { title, short_description, article } = req.body;

    await Article.create({ title, short_description, article, userId: id });

    res.json({
      status: true,
      message: "Вы успешно создали статью",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const updateArticle = async function (req, res) {
  try {
    const { title, short_description, article } = req.body;

    await Article.update(
      { title, short_description, article },
      {
        where: { userId: req.user.id, id: req.params.id },
      }
    );

    res.json({
      status: true,
      message: "Вы успешно обновили статью",
    });
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
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  deleteArticles,
};
