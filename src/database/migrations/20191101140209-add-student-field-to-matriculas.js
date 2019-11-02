module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matriculas', 'student_id', {
      type: Sequelize.INTEGER,
      unique: true,
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
