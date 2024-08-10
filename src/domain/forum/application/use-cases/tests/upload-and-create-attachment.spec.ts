import { RegisterStudentUseCase } from "../register-student";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { FakeHasher } from "test/criptography/fake-hasher";
import { InMemoryAttachmentsRepository } from "test/repositories/in-memory-attachments-repository";
import { UploadAndCreateAttachmentUseCase } from "../upload-and-create-attachment";
import { FakeUploader } from "test/storage/fake-uploader";
import { InvalidAttachmentTypeError } from "../errors/invalid-attachment-type";

let attachmentsRepository: InMemoryAttachmentsRepository;
let fakeUploader: FakeUploader;
let sut: UploadAndCreateAttachmentUseCase;

describe("Upload and create attachment tests", () => {
  beforeEach(() => {
    attachmentsRepository = new InMemoryAttachmentsRepository();
    fakeUploader = new FakeUploader();
    sut = new UploadAndCreateAttachmentUseCase(
      attachmentsRepository,
      fakeUploader
    );
  });

  it("should be able to upload and create an attachment", async () => {
    const result = await sut.execute({
      fileName: "profile.png",
      fileType: "image/png",
      body: Buffer.from(""),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      attachment: attachmentsRepository.items[0],
    });
    expect(fakeUploader.uploads).toHaveLength(1);
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: "profile.png",
      })
    );
  });

  it("should not be able to upload invalid file type", async () => {
    const result = await sut.execute({
      fileName: "profile.png",
      fileType: "application/json",
      body: Buffer.from(""),
    });

    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError);
  });
});
