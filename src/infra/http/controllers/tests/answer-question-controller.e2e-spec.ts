import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";

import request from "supertest";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";

describe("Answer question e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);

    await app.init();
  });

  test("[POST] /questions/:questionId/answers", async () => {
    const user = await studentFactory.makePrismaStudent();

    const token = jwt.sign({
      sub: user.id.toString(),
    });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const questionId = question.id.toString();

    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "New answer to your question",
      });

    expect(response.statusCode).toBe(201);

    const answerOnDatabase = prisma.answer.findUnique({
      where: {
        id: questionId,
      },
    });

    expect(answerOnDatabase).toBeTruthy();
  });
});
