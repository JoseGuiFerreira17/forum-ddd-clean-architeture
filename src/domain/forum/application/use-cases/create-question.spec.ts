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
    const { question } = await sut.execute({
      authorId: '1',
      title: 'question title',
      content: 'question content',
    });

    expect(question).toMatchObject({
      content: 'question content',
    });
    expect(inMemoryRepository.items[0].id).toEqual(question.id);
  });
});
