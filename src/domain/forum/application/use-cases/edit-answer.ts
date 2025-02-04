import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { NotAllowedError } from './errors/not-allowed';

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { answer: Answer }
>;
export class EditAnswerUseCase {
  constructor(private answersRespository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRespository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    answer.content = content;

    await this.answersRespository.update(answer);

    return right({ answer });
  }
}
