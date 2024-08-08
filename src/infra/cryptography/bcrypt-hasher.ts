import { HashComparer } from "@/domain/forum/application/criptography/hash-comparer";
import { HashGenerator } from "@/domain/forum/application/criptography/hash-generator";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private rounds = 8;

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }

  hash(plain: string): Promise<string> {
    return hash(plain, this.rounds);
  }
}
