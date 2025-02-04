import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuetionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchQuetionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class FetchQuetionCommentsUseCase {
  constructor(
    private questionCommentsRespository: QuestionCommentsRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: FetchQuetionCommentsUseCaseRequest): Promise<FetchQuetionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRespository.findManyByQuestionId(questionId, {
        page,
      });

    if (!questionComments) {
      throw new Error('Answer not found');
    }

    return { questionComments };
  }
}
