import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BotService } from './bot.service';
import { Message } from './message.entity';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get('status')
  getStatus() {
    return { status: 'Bot ishlayapti' };
  }

  @Get('messages')
  async getMessages(): Promise<Message[]> {
    return this.botService.getMessages();
  }

  @Post('send-to-channel')
  async sendToChannel(
    @Query('channelId') channelId: string,
    @Body() messageData: any,
  ): Promise<{ message: string }> {
    if (!channelId) {
      throw new Error('channelId parametri talab qilinadi');
    }
    await this.botService.sendSingleMessageToChannel(channelId, messageData);
    return { message: `Ma'lumotlar ${channelId} kanaliga yuborildi` };
  }
}
