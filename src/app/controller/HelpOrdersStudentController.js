import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';

class HelpOrdersStudentController {
  async index(req, res) {
    const { id } = req.params;

    const studentsValid = await Student.findByPk(id);

    if (!studentsValid) {
      return res
        .status(400)
        .json({ error: 'Estudante informando não encontrado!' });
    }

    const helps = await HelpOrders.findAll({
      where: { student_id: id },
    });
    return res.json(helps);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const studentsValid = await Student.findByPk(id);

    if (!studentsValid) {
      return res
        .status(400)
        .json({ error: 'Estudante informando não encontrado!' });
    }
    if (!question) {
      return res
        .status(401)
        .json({ error: 'Pergunta não pode ficar em branco' });
    }

    const student_id = id;
    const helpQuestion = await HelpOrders.create({
      student_id,
      question,
    });

    return res.json(helpQuestion);
  }
}

export default new HelpOrdersStudentController();
