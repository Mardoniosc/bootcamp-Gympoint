module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matriculas', 'plan_id', {
      type: Sequelize.INTEGER,
      references: { model: 'plans', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('matriculas', 'plan_id');
  },
};
