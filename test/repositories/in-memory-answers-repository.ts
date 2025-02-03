import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findById(id: string) {
    return this.items.find((answer) => answer.id.toString() === id) || null;
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);
    this.items.splice(index, 1);
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }
}
