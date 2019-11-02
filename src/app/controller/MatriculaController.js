import * as Yup from 'yup';
import { addDays } from 'date-fns';
import Matricula from '../models/Matricula';
import Plan from '../models/Plan';
import Student from '../models/Student';

class MatriculaController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const matriculas = await Matricula.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration'],
        },
      ],
    });
    return res.json(matriculas);
  }

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
    const studentDuplication = await Matricula.findOne({
      where: { student_id: id },
    });
    if (studentDuplication) {
      return res
        .status(401)
        .json({ error: 'Estudante já cadastrado em um plano!' });
    }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      name_plan: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validação de dados falhou' });
    }

    const { id } = req.params;
    const matricula = await Matricula.findByPk(id);
    if (!matricula) {
      return res.status(400).json({ error: 'matricula não encontrada' });
    }

    const plan = await Plan.findOne({
      where: { title: req.body.name_plan },
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plano informado não encontrado' });
    }

    const { start_date, student_id } = matricula;
    const price = plan.price * plan.duration;
    const plan_id = plan.id;
    const end_date = addDays(new Date(start_date), plan.duration * 30);
    const valideIdStudents = await Student.findByPk(student_id);
    if (!valideIdStudents) {
      return res
        .status(400)
        .json({ error: 'Estudando não encontrado na base de dados' });
    }
    console.log(end_date, price, plan_id, student_id);
    await matricula.update({
      end_date,
      price,
      plan_id,
      student_id,
    });
    return res.json({
      matricula: {
        id,
        start_date,
        end_date,
        price,
      },
    });
  }

  async delete(req, res) {
    const matricula = await Matricula.findByPk(req.params.id);

    if (!matricula) {
      return res.status(400).json({ error: 'Matricula não encontrado' });
    }

    await matricula.destroy();
    return res.json({ ok: 'sucesso' });
  }
}

export default new MatriculaController();
