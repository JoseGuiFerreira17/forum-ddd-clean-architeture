import { Optional } from '@/core/entities/types/optional';
import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface QuestionCommentProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class QuestionComment extends Entity<QuestionCommentProps> {
  get authorId() {
    return this.props.authorId;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );

    return questionComment;
  }
}
