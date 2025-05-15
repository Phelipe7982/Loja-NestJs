import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  inicializar(): string {
    return "Testando o Nest.js pela primeira vez...";
  }
}
