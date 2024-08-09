import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation.pipe";
import { EditAnswerUseCase } from "@/domain/forum/application/use-cases/edit-answer";
import { z } from "zod";

const editAnswerBodySchema = z.object({
  content: z.string(),
});

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema);

@Controller("/answers/:id")
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @Param("id") answerId: string
  ) {
    const { content } = body;
    const { sub } = user;

    const result = await this.editAnswer.execute({
      answerId,
      content,
      authorId: sub,
      attachmentIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
