import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { EditAnswerUseCase } from './edit-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { NotAllowedError } from './errors/not-allowed';

let inMemoryRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('edit answer use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryRepository);
  });

  it('should be able edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    inMemoryRepository.create(newAnswer);

    await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content: 'new content',
    });

    expect(inMemoryRepository.items[0]).toMatchObject({
      content: 'new content',
    });
  });

  it('should not be able edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    inMemoryRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: newAnswer.id.toString(),
      content: 'new content',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
