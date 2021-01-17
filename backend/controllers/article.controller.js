const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const likes = 0;
    const dislikes = 0;

    if (title !== '' && description !== '' && author !== '') {
        const article = {
            title: title,
            description: description,
            author: author,
            likes: likes,
            dislikes: dislikes,
        };
        Article.create(article)
            .then((data) => {
                res.status(201).send(data);
            })
            .catch(err => res.status(500).json({ err }));
    } else {
        return res.status(400).json({ error: "Erreur pendant la création de l'article."});
    }
};

exports.findAll = (req, res) => {

};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};