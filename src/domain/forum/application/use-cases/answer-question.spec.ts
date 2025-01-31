import { AnswerQuestion } from './answer-question';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';

const mockAnswerRepository: AnswerRepository = {
  create: async function (answer: Answer) {
    return;
  },
};

test('create answer', async () => {
  const answerQuestion = new AnswerQuestion(mockAnswerRepository);

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'answer content',
  });

  expect(answer).toMatchObject({
    content: 'answer content',
  });
});
