import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { Student } from "@/domain/forum/enterprise/entities/student";

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
