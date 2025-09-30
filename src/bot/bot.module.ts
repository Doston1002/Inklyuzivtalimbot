import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { Message, MessageSchema } from './message.entity';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/inklyuziv_talim'),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [BotService],
  controllers: [BotController],
})
export class BotModule {}
