/**
 * Article model
 *
 * Author REQ
 * Title REQ
 * Description REQ
 * Date REQ
 * Comments NULL [Array Article]
 * Image NULL
 * Link NULL
 * Likes = 0
 * Dislikes = 0
 * UserLikes [Array userIDs]
 * UserDislikes [Array userIDs]
 */

module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("Article", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.INTEGER,
    },
    likes: {
      type: Sequelize.INTEGER,
    },
    dislikes: {
      type: Sequelize.INTEGER,
    },
  });

  return Article;
};
