import { PaginationParams } from '@/core/repositories/paginations-params';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async findById(id: string) {
    return this.items.find((answer) => answer.id.toString() === id) || null;
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);
    this.items.splice(index, 1);
  }

  async update(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);
    this.items[index] = answer;
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }
}
