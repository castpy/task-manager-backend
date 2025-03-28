import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

declare module '@prisma/client' {
  interface PrismaClients {
    $on(event: 'beforeExit' | never, callback: (...args: any[]) => void): void;
  }
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conectado ao banco de dados com sucesso.');
    } catch (error) {
      this.logger.error(
        'Erro durante a conexão com o banco de dados',
        error.stack,
      );
      throw error;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      try {
        this.logger.log('Evento beforeExit acionado. Encerrando a aplicação.');
        await app.close();
      } catch (error) {
        this.logger.error(
          'Erro durante o encerramento da aplicação',
          error.stack,
        );
      }
    });
  }
}
