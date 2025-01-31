import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswerRepository } from '../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestion {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
