import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-object";
import { Slug } from "./slug";

export interface QuestionWithAuthorProps {
  questionId: UniqueEntityID;
  authorId: UniqueEntityID;
  author: string;
  bestAnswerId?: UniqueEntityID | null;
  title: string;
  slug: Slug;
  createdAt: Date;
}

export class QuestionWithAuthor extends ValueObject<QuestionWithAuthorProps> {
  get questionId() {
    return this.props.questionId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }

  get author() {
    return this.props.author;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: QuestionWithAuthorProps) {
    return new QuestionWithAuthor(props);
  }
}
