import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('answer question use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryRepository);
  });

  it('should be able create a answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'answer content',
    });

    expect(answer).toMatchObject({
      content: 'answer content',
    });
    expect(inMemoryRepository.items[0].id).toEqual(answer.id);
  });
});
