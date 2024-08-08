import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { FetchAnswerCommentsUseCase } from "../fetch-answer-comments";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { MakeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("Fetch answer comments", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to fetch answer's comments", async () => {
    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );
    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );
    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );
    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );

    const result = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });

    expect(result.value?.answerComments).toHaveLength(4);
  });

  it("Should be able to fetch paginated answer comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        MakeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
      );
    }

    const result = await sut.execute({
      page: 2,
      answerId: "answer-1",
    });

    expect(result.value?.answerComments).toHaveLength(2);
  });
});
