import { makeAnswer } from 'test/factories/make-answer';
import { FetchQuetionsAnswerUseCase } from './fetch-quetions-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryRepository: InMemoryAnswersRepository;
let sut: FetchQuetionsAnswerUseCase;

describe('fetch quetions answer use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository();
    sut = new FetchQuetionsAnswerUseCase(inMemoryRepository);
  });

  it('should be able to fetch  questions answer', async () => {
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    );
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    );
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    );

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(answers).toHaveLength(3);
  });

  it('should be able to fetch paginated questions answer', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      );
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
