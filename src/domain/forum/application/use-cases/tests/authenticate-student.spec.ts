import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { FakeHasher } from "test/criptography/fake-hasher";
import { FakeEncrypter } from "test/criptography/fake-encrypter";
import { AuthenticateStudentUseCase } from "../authenticate-student";
import { MakeStudent } from "test/factories/make-student";

let studentsRepository: InMemoryStudentsRepository;
let hashGenerator: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateStudentUseCase;

describe("Authenticate student use case tests", () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();

    hashGenerator = new FakeHasher();
    encrypter = new FakeEncrypter();
    sut = new AuthenticateStudentUseCase(
      studentsRepository,
      hashGenerator,
      encrypter
    );
  });

  it("should be able to authenticate a student", async () => {
    const newStudent = MakeStudent({
      email: "johndoe@example.com",
      password: await hashGenerator.hash("123456"),
    });

    studentsRepository.items.push(newStudent);

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
