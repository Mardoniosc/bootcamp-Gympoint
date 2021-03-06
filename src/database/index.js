import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import HelpOrders from '../app/models/HelpOrders';
import Checkin from '../app/models/Checkin';
import Matricula from '../app/models/Matricula';
import databaseConfig from '../config/database';

const models = [User, Student, Plan, Matricula, Checkin, HelpOrders];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
