import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/use-cases/fetch-question-answers";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { makeStudent } from "test/factories/make-student";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let studentsRepository: InMemoryStudentsRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch Question Answers", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    studentsRepository = new InMemoryStudentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
      studentsRepository
    );
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch question answers", async () => {
    const student = makeStudent({
      name: "John Doe",
    });

    studentsRepository.items.push(student);

    const answer1 = makeAnswer({
      questionId: new UniqueEntityID("question-1"),
      authorId: student.id,
    });

    const answer2 = makeAnswer({
      questionId: new UniqueEntityID("question-1"),
      authorId: student.id,
    });

    const answer3 = makeAnswer({
      questionId: new UniqueEntityID("question-1"),
      authorId: student.id,
    });

    await inMemoryAnswersRepository.create(answer1);
    await inMemoryAnswersRepository.create(answer2);
    await inMemoryAnswersRepository.create(answer3);

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.value?.answers).toHaveLength(3);
    expect(result.value?.answers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: "John Doe",
          answerId: answer1.id,
        }),
        expect.objectContaining({
          author: "John Doe",
          answerId: answer2.id,
        }),
        expect.objectContaining({
          author: "John Doe",
          answerId: answer3.id,
        }),
      ])
    );
  });

  it("should be able to fetch paginated question answers", async () => {
    const student = makeStudent({
      name: "John Doe",
    });

    studentsRepository.items.push(student);

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID("question-1"),
          authorId: student.id,
        })
      );
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.value?.answers).toHaveLength(2);
  });
});
