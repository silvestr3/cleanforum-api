import {
  Question as PrismaQuestion,
  User as PrismaAuthor,
} from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { QuestionWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/question-with-author";

type PrismaQuestionWithAuthor = PrismaQuestion & {
  author: PrismaAuthor;
};

export class PrismaQuestionWithAuthorMapper {
  static toDomain(raw: PrismaQuestionWithAuthor): QuestionWithAuthor {
    return QuestionWithAuthor.create({
      questionId: new UniqueEntityID(raw.id),
      authorId: new UniqueEntityID(raw.authorId),
      bestAnswerId: raw.bestAnswerId
        ? new UniqueEntityID(raw.bestAnswerId)
        : null,
      title: raw.title,
      slug: Slug.create(raw.slug),
      author: raw.author.name,
      createdAt: raw.createdAt,
    });
  }
}
