import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);
  }

  onModuleInit() {
    this.bot.on('message', async (ctx: Context) => {
      if (ctx.message && 'message_id' in ctx.message && 'chat' in ctx.message) {
        const channelId: string = process.env.TELEGRAM_CHANNEL_ID as string;
        try {
          await ctx.telegram.forwardMessage(channelId, ctx.message.chat.id, ctx.message.message_id);
        } catch (err) {
          console.error('Xabar forward qilishda xatolik:', err);
        }
      }
    });

    this.bot.launch();
    console.log('Telegram bot ishga tushdi');
  }
}
