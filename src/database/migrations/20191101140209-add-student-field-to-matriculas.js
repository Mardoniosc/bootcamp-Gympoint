module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matriculas', 'student_id', {
      type: Sequelize.INTEGER,
      references: { model: 'students', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('matriculas', 'student_id');
  },
};
