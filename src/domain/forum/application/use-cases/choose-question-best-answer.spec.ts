import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { makeQuestion } from 'test/factories/make-question';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('choose questions best answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    );
  });

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id,
    );
  });

  it('should not be able to choose another user quest best answer', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityId('auhtor-1') });
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await expect(() =>
      sut.execute({
        authorId: 'auhtor-2',
        answerId: answer.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
