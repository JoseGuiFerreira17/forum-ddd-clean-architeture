import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/entities/types/optional';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface NotificationProps {
  recipirentId: UniqueEntityId;
  title: string;
  content: string;
  createdAt: Date;
  readAt?: Date;
}

export class Notification extends Entity<NotificationProps> {
  get recipirentId() {
    return this.props.recipirentId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get readAt() {
    return this.props.readAt;
  }

  static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return notification;
  }
}
