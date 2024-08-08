import { Module } from "@nestjs/common";
import { BcryptHasher } from "./bcrypt-hasher";
import { JwtEncrypter } from "./jwt-encrypter";
import { HashGenerator } from "@/domain/forum/application/criptography/hash-generator";
import { Encrypter } from "@/domain/forum/application/criptography/encrypter";
import { HashComparer } from "@/domain/forum/application/criptography/hash-comparer";

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
