import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async findById(id: string) {
    return this.items.find((item) => item.id.toString() === id) || null;
  }

  async delete(questionComment: QuestionComment) {
    const index = this.items.findIndex(
      (item) => item.id === questionComment.id,
    );
    this.items.splice(index, 1);
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }
}
