import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validação de dados falhou!' });
    }

    const planExist = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExist) {
      return res.status(400).json({ error: 'Nome de plano já cadastrado!' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      plan: {
        title,
        duration,
        price,
      },
    });
  }

  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid)) {
      return res.status(400).json({ error: 'Validação de dados falhou!' });
    }

    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res
        .status(400)
        .json({ error: 'Plano não encontrado para atualização' });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      plan: {
        id,
        title,
        duration,
        price,
      },
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plano informado não encontrado' });
    }

    await plan.destroy();

    return res.json();
  }
}

export default new PlanController();
