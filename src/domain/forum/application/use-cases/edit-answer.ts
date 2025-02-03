import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answersRespository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRespository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('You can only delete your own answers');
    }

    answer.content = content;

    await this.answersRespository.update(answer);

    return { answer };
  }
}
