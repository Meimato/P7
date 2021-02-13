module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ArticleId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return Comment;
};
