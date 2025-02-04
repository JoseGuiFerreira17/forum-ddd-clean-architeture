import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface FetchQuetionCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

interface FetchQuetionCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FetchQuetionCommentsUseCase {
  constructor(private answerCommentsRespository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchQuetionCommentsUseCaseRequest): Promise<FetchQuetionCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRespository.findManyByAnswerId(answerId, {
        page,
      });

    if (!answerComments) {
      throw new Error('Answer not found');
    }

    return { answerComments };
  }
}
