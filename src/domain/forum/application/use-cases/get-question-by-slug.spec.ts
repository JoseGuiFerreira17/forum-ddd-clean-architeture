import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('get question by slug use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryRepository);
  });

  test('should be able create a question', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('question-title'),
    });

    inMemoryRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'question-title',
    });

    expect(question.title).toEqual(newQuestion.title);
  });
});
