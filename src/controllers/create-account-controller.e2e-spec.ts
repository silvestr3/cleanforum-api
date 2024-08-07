import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import request from "supertest";

describe("Create account e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test("[POST] /accounts", async () => {
    const response = await request(app.getHttpServer()).post("/accounts").send({
      name: "Test user",
      email: "test@test.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = prisma.user.findUnique({
      where: {
        email: "test@test.com",
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
