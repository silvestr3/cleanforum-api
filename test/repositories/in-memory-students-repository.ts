import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export class InMemoryStudentsRepository implements StudentsRepository {
  items: Student[] = [];

  async create(student: Student): Promise<void> {
    this.items.push(student);
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.items.find((item) => item.email === email);

    return student ?? null;
  }
}
