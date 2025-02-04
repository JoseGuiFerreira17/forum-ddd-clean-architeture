import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { FetchQuetionCommentsUseCase } from './fetch-answer-comments';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryRepository: InMemoryAnswerCommentsRepository;
let sut: FetchQuetionCommentsUseCase;

describe('fetch recent quetion comments use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchQuetionCommentsUseCase(inMemoryRepository);
  });

  it('should be able to fetch answer comments', async () => {
    await inMemoryRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    );
    await inMemoryRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    );
    await inMemoryRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    );

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    });

    expect(answerComments).toHaveLength(3);
  });

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      );
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    });

    expect(answerComments).toHaveLength(2);
  });
});
