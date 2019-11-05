import HelpOrders from '../models/HelpOrders';

class HelpOrdersStudentController {
  async index(req, res) {
    const { id } = req.params;

    const helps = await HelpOrders.findAll({
      where: { student_id: id },
    });
    return res.json(helps);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const student_id = id;
    const helpQuestion = await HelpOrders.create({
      student_id,
      question,
    });

    return res.json(helpQuestion);
  }
}

export default new HelpOrdersStudentController();
