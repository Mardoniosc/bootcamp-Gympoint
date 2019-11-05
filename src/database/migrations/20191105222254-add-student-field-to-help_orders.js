module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('help_orders', 'student_id', {
      type: Sequelize.INTEGER,
      references: { model: 'students', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('help_orders', 'student_id');
  },
};
