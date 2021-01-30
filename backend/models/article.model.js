module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("Article", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    author: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING
    }
  });

  return Article;
};
