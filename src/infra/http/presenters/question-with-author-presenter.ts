import { QuestionWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/question-with-author";

export class QuestionWithAuthorPresenter {
  static toHTTP(question: QuestionWithAuthor) {
    return {
      questionId: question.questionId.toString(),
      authorId: question.authorId.toString(),
      authorName: question.author,
      title: question.title,
      slug: question.slug.value,
      bestAnswer: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
    };
  }
}
