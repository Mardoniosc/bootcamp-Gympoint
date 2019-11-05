import HelpOrders from '../models/HelpOrders';

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

    await help_orders.update({
      answer,
      answer_at,
    });
    return res.json(help_orders);
  }
}

export default new HelpOrdersAcademyController();
