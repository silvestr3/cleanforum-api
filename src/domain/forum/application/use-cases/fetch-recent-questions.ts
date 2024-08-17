import { QuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { QuestionWithAuthor } from "../../enterprise/entities/value-objects/question-with-author";

interface FetchRecentQuestionsUseCaseRequest {
  page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: QuestionWithAuthor[];
  }
>;

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecentWithAuthor({
      page,
    });

    return right({
      questions,
    });
  }
}
