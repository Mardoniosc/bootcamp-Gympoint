import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const { title, duration, price, type_plan } = await Plan.create(req.body);

    return res.json({
      plan: {
        title,
        duration,
        price,
        type_plan,
      },
    });
  }

  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async update(req, res) {
    const { id } = req.params;
    // const { title, duration, price } = req.body;

    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res
        .status(400)
        .json({ error: 'Plano não encontrado para atualização' });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      plan: {
        title,
        duration,
        price,
      },
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    await plan.destroy();

    return res.json({ ok: true });
  }
}

export default new PlanController();
