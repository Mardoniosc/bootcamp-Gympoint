import * as Yup from 'yup';
import { addDays } from 'date-fns';
import Matricula from '../models/Matricula';
import Plan from '../models/Plan';
import Student from '../models/Student';

class MatriculaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      name_plan: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validação de dados falhou' });
    }

    const plan = await Plan.findOne({
      where: { title: req.body.name_plan },
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plano informado não encontrado' });
    }

    const price = plan.price * plan.duration;
    const { start_date, name_plan } = req.body;
    const end_date = addDays(new Date(start_date), plan.duration * 30);
    const plan_id = plan.id;
    const { id } = req.params;
    const valideIdStudents = await Student.findByPk(id);
    if (!valideIdStudents) {
      return res
        .status(400)
        .json({ error: 'Estudando não encontrado na base de dados' });
    }
    const student_id = id;
    await Matricula.create({
      start_date,
      end_date,
      price,
      plan_id,
      student_id,
    });
    return res.json({
      matricula: {
        start_date,
        end_date,
        price,
        name_plan,
      },
    });
  }
}

export default new MatriculaController();
