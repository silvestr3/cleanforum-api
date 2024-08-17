import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { FetchRecentQuestionsUseCase } from "../fetch-recent-questions";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryAttachmentsRepository } from "test/repositories/in-memory-attachments-repository";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { makeStudent } from "test/factories/make-student";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository
    );
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to fetch recent questions", async () => {
    const author = makeStudent({
      name: "John Doe",
    });

    await inMemoryStudentsRepository.create(author);

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2022, 0, 20),
        authorId: author.id,
      })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2022, 0, 18),
        authorId: author.id,
      })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2022, 0, 23),
        authorId: author.id,
      })
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.value?.questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2022, 0, 23),
        author: "John Doe",
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 20),
        author: "John Doe",
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 18),
        author: "John Doe",
      }),
    ]);
  });

  it("should be able to fetch paginated recent questions", async () => {
    const author = makeStudent({
      name: "John Doe",
    });

    await inMemoryStudentsRepository.create(author);

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({
          authorId: author.id,
        })
      );
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.value?.questions).toHaveLength(2);
  });
});
