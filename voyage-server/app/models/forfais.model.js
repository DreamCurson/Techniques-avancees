module.exports = (connex, Sequelize) => {
  const Forfais = connex.define("forfais", {
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.REAL,
    },
    description: {
      type: Sequelize.TEXT,
    },
    category: {
      type: Sequelize.STRING,
    },
  });
  return Forfais;
};
