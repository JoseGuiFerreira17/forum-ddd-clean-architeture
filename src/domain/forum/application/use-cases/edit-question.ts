import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { NotAllowedError } from './errors/not-allowed';

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>;

export class EditQuestionUseCase {
  constructor(private questionsRespository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRespository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    question.title = title;
    question.content = content;

    await this.questionsRespository.update(question);

    return right({ question });
  }
}
