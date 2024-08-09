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
import { CommentOnQuestionUseCase } from "@/domain/forum/application/use-cases/comment-on-question";
import { z } from "zod";

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
});

type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(commentOnQuestionBodySchema);

@Controller("/questions/:questionId/comments")
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CommentOnQuestionBodySchema,
    @Param("questionId") questionId: string
  ) {
    const { content } = body;
    const { sub } = user;

    const result = await this.commentOnQuestion.execute({
      authorId: sub,
      content: content,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
