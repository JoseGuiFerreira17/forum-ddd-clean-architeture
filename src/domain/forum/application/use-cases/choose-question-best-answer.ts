import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw new Error('Question not found');
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('User is not the author of the question');
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return { question };
  }
}
