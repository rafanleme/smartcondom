'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('living', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'members', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      condominium_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'condominiums', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      apartment_block: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      apartment_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aproved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      aproved_manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'managers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      aproved_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('living');
  }
};
