import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('create question use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryRepository);
  });

  it('should be able create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'question title',
      content: 'question content',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items[0]).toEqual(result.value?.question);
    expect(inMemoryRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ]);
  });
});
