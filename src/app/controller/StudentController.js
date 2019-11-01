import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação de dados falhou' });
    }

    const userExist = await Student.findOne({
      where: { email: req.body.email },
    });

    if (userExist) {
      return res.status(400).json({ error: 'E-mail já cadastrado!' });
    }

    const { nome, email, idade, peso, altura } = await Student.create(req.body);

    return res.json({
      student: {
        nome,
        email,
        idade,
        peso,
        altura,
      },
    });
  }
}

export default new StudentController();
