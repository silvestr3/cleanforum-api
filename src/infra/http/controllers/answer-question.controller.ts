import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation.pipe";
import { z } from "zod";
import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question";

const answerQuestionBodySchema = z.object({
  content: z.string(),
});

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema);

@Controller("/questions/:questionId/answers")
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: AnswerQuestionBodySchema,
    @Param("questionId") questionId: string
  ) {
    const { content } = body;
    const { sub } = user;

    const result = await this.answerQuestion.execute({
      questionId,
      authorId: sub,
      content,
      attachmentIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
