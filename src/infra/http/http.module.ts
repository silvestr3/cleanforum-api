import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { GetQuestionBySlug } from "./controllers/get-question-by-slug.controller";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { EditQuestionUseCase } from "@/domain/forum/application/use-cases/edit-question";
import { DeleteQuestionUseCase } from "@/domain/forum/application/use-cases/delete-question";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student";
import { EditQuestionController } from "./controllers/edit-question.controller";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { DeleteQuestionController } from "./controllers/delete-question.controller";
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/use-cases/get-question-by-slug";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { CommentOnQuestionController } from "./controllers/comment-on-question.controller";
import { AnswerQuestionController } from "./controllers/answer-question.controller";
import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question";
import { EditAnswerController } from "./controllers/edit-answer.controller";
import { EditAnswerUseCase } from "@/domain/forum/application/use-cases/edit-answer";
import { DeleteAnswerController } from "./controllers/delete-answer.controller";
import { DeleteAnswerUseCase } from "@/domain/forum/application/use-cases/delete-answer";
import { FetchQuestionAnswersController } from "./controllers/fetch-question-answers.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/use-cases/fetch-question-answers";
import { ChooseQuestionBestAnswerUseCase } from "@/domain/forum/application/use-cases/choose-question-best-answer";
import { CommentOnQuestionUseCase } from "@/domain/forum/application/use-cases/comment-on-question";
import { DeleteQuestionCommentUseCase } from "@/domain/forum/application/use-cases/delete-question-comment";
import { ChooseQuestionBestAnswerController } from "./controllers/choose-question-best-answer.controller";
import { DeleteQuestionCommentController } from "./controllers/delete-question-comment.controller";
import { CommentOnAnswerController } from "./controllers/comment-on-answer.controller";
import { CommentOnAnswerUseCase } from "@/domain/forum/application/use-cases/comment-on-answer";
import { DeleteAnswerCommentController } from "./controllers/delete-answer-comment.controller";
import { DeleteAnswerCommentUseCase } from "@/domain/forum/application/use-cases/delete-answer-comment";
import { FetchQuestionCommentsController } from "./controllers/fetch-question-comments.controller";
import { FetchQuestionCommentsUseCase } from "@/domain/forum/application/use-cases/fetch-question-comments";
import { FetchAnswerCommentsController } from "./controllers/fetch-answer-comments.controller";
import { FetchAnswerCommentsUseCase } from "@/domain/forum/application/use-cases/fetch-answer-comments";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlug,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionCommentsUseCase,
    FetchAnswerCommentsUseCase,
  ],
})
export class HttpModule {}
