module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('checkins', 'student_id', {
      type: Sequelize.INTEGER,
      references: { model: 'students', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('checkins', 'student_id');
  },
};
