import { Optional } from '@/core/entities/types/optional';
import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface AnswerCommentProps {
  authorId: UniqueEntityId;
  answerId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class AnswerComment extends Entity<AnswerCommentProps> {
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
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );

    return answerComment;
  }
}
