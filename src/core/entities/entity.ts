import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "./unique-entity-id";

export class Entity<Props> {
  private _id: UniqueEntityId;
  protected props: Props;

  get id(): UniqueEntityId {
    return this._id;
  }

  protected constructor(props: any, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId(id);
  }
}
