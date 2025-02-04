import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe('create comment on question use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionCommentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryRepository,
    );
  });

  it('should be able comment on question', async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    const { questionComment } = await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'comment content',
    });

    expect(questionComment).toMatchObject({
      content: 'comment content',
    });
  });
});
