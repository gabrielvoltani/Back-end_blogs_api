'use strict';

const { NEWDATE } = require("mysql2/lib/constants/types");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }, 
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      }, 
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      }, 
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        // field: 'user_id',
        reference: {
          // talvez seja references
          model: 'users',
          key: 'id',
        },
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('blog_posts');
  }
};
