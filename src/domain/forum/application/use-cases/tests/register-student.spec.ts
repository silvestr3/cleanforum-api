import { RegisterStudentUseCase } from "../register-student";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { FakeHasher } from "test/criptography/fake-hasher";

let studentsRepository: InMemoryStudentsRepository;
let hashGenerator: FakeHasher;

let sut: RegisterStudentUseCase;

describe("Register student use case tests", () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository();

    hashGenerator = new FakeHasher();
    sut = new RegisterStudentUseCase(studentsRepository, hashGenerator);
  });

  it("should be able to register a new student", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      student: studentsRepository.items[0],
    });
  });

  it("should hash student password upon registration", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(studentsRepository.items[0].password).toEqual("123456-hashed");
  });
});
