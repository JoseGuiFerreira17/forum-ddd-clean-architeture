import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { DeleteAnswerUseCase } from './delete-answer';
import { makeAnswer } from 'test/factories/make-answer';

let inMemoryRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('delete question use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryRepository);
  });

  it('should be able delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    inMemoryRepository.create(newAnswer);

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
    });

    expect(inMemoryRepository.items).toHaveLength(0);
  });

  it('should not be able delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    inMemoryRepository.create(newAnswer);

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
