import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation.pipe";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { z } from "zod";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller("/questions")
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema
  ) {
    const { content, title, attachments } = body;
    const { sub } = user;

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: sub,
      attachmentIds: attachments,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
