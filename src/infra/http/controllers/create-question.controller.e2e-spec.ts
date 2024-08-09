import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";

import request from "supertest";
import { StudentFactory } from "test/factories/make-student";

describe("Create question e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let studentFactory: StudentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);

    await app.init();
  });

  test("[POST] /questions", async () => {
    const user = await studentFactory.makePrismaStudent();

    const token = jwt.sign({
      sub: user.id.toString(),
    });

    const response = await request(app.getHttpServer())
      .post("/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test question",
        content: "Test content",
      });

    expect(response.statusCode).toBe(201);

    const questionOnDatabase = prisma.question.findFirst({
      where: {
        title: "Test question",
      },
    });

    expect(questionOnDatabase).toBeTruthy();
  });
});
