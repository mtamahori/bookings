const Sequelize = require('sequelize')
const db = require('../db')

const Booker = db.define('booker', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

module.exports = Booker;
