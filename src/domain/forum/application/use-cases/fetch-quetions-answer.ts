import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface FetchQuetionsAnswerUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchQuetionsAnswerUseCaseResponse {
  answers: Answer[];
}

export class FetchQuetionsAnswerUseCase {
  constructor(private answerRespository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuetionsAnswerUseCaseRequest): Promise<FetchQuetionsAnswerUseCaseResponse> {
    const answers = await this.answerRespository.findManyByQuestionId(
      questionId,
      { page },
    );

    if (!answers) {
      throw new Error('Answer not found');
    }

    return { answers };
  }
}
