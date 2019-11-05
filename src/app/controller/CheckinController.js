import Sequelize from 'sequelize';
import Studente from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    return res.json({ ok: 'consultou checkin' });
  }

  async store(req, res) {
    const { Op } = Sequelize;
    const { id } = req.params;

    const valideStudent = await Studente.findByPk(id);

    if (!valideStudent) {
      return res.status(400).json({ error: 'Studante não cadastrado!' });
    }

    const totalChekins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 7000),
        },
      },
    });

    if (totalChekins.length > 5) {
      return res
        .status(401)
        .json({ error: 'Usuário já fez 5 checkins nos ultimos 7 dias' });
    }
    const student_id = id;
    await Checkin.create({
      student_id,
    });
    return res.json();
  }
}

export default new CheckinController();
