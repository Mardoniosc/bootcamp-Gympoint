import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WellcomeMail {
  get key() {
    return 'WellcomeMail';
  }

  async handle({ data }) {
    const { matricula } = data;

    await Mail.sendMail({
      to: `${matricula.student.nome} <${matricula.student.email}>`,
      subject: 'Bem vindo a Gympoint',
      template: 'wellcome',
      context: {
        student: matricula.student.nome,
        plan_title: matricula.plan.title,
        price: matricula.price,
        end_date: format(
          parseISO(matricula.end_date),
          "'Dia ' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new WellcomeMail();
