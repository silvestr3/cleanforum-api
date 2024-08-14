import { OnAnswerCreated } from "@/domain/notification/application/subscribers/on-answer-created";
import { OnQuestionBestAnswerChosen } from "@/domain/notification/application/subscribers/on-question-best-answer-chosen";
import { ReadNotificationUseCase } from "@/domain/notification/application/use-cases/read-notification";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
    ReadNotificationUseCase,
  ],
})
export class EventsModule {}
