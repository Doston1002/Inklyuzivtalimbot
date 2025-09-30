import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { Message } from './message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bot.db',
      entities: [Message],
      synchronize: true, // Productionda false qilish tavsiya etiladi
    }),
    TypeOrmModule.forFeature([Message]),
  ],
  providers: [BotService],
  controllers: [BotController],
})
export class BotModule {}
