import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;
    await Mail.sendMail({
      to: `${helpOrder.student.nome} <${helpOrder.student.email}>`,
      subject: `Resposta de seu questionamento`,
      template: 'HelpOrder',
      context: {
        student: helpOrder.student.nome,
        answer: helpOrder.answer,
        question: helpOrder.question,
      },
    });
  }
}

export default new HelpOrderMail();
