import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';

let inMemoryRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('edit question use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryRepository);
  });

  it('should be able edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    inMemoryRepository.create(newQuestion);

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toString(),
      title: 'new title',
      content: 'new content',
    });

    expect(inMemoryRepository.items[0]).toMatchObject({
      title: 'new title',
      content: 'new content',
    });
  });

  it('should not be able edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    inMemoryRepository.create(newQuestion);

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        questionId: newQuestion.id.toString(),
        title: 'new title',
        content: 'new content',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
