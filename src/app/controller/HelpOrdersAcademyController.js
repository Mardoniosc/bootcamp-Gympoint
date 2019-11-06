import HelpOrders from '../models/HelpOrders';
import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';
import Student from '../models/Student';

class HelpOrdersAcademyController {
  async index(req, res) {
    const helpAll = await HelpOrders.findAll({
      where: { answer: null },
    });

    return res.json(helpAll);
  }

  async store(req, res) {
    const { id } = req.params;
    const { answer } = req.body;
    const answer_at = new Date();

    const help_orders = await HelpOrders.findByPk(id);

    if (!help_orders) {
      return res.status(400).json({
        error: 'Não foi encontrado a questão solicitada para resposta!',
      });
    }

    if (!answer) {
      return res
        .status(401)
        .json({ error: 'resposta não pode ficar em branco' });
    }
    await help_orders.update({
      answer,
      answer_at,
    });

    const helpOrder = await HelpOrders.findOne({
      where: { id },
      attributes: ['question', 'answer'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],
        },
      ],
    });
    await Queue.add(HelpOrderMail.key, {
      helpOrder,
    });

    return res.json(help_orders);
  }
}

export default new HelpOrdersAcademyController();
