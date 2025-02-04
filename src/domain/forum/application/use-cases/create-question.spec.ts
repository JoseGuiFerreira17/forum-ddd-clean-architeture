import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';

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
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items[0]).toEqual(result.value?.question);
  });
});
