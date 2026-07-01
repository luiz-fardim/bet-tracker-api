import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Seja Bem-Vindo ao Bet-Tracker, o melhor gerenciador de apostas que você já viu!';
  }
}
