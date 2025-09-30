import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.entity';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: Telegraf;

  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);
  }

  async onModuleInit() {
    this.bot.on('message', async (ctx: Context) => {
      if (ctx.message && 'message_id' in ctx.message && 'chat' in ctx.message) {
        const channelId: string = process.env.TELEGRAM_CHANNEL_ID as string;
        const newMessage = new this.messageModel({
          userId: ctx.message.from?.id.toString() || '',
          username: ctx.message.from?.username || ctx.message.from?.first_name || "Noma'lum",
          text: 'text' in ctx.message ? ctx.message.text || '' : '',
          chatId: ctx.message.chat.id.toString(),
          timestamp: new Date(),
        });

        await newMessage.save();

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

  async getMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async sendSingleMessageToChannel(channelId: string, messageData: any): Promise<void> {
    const formattedMessage = `
ID: <b>${messageData.id}</b>
Foydalanuvchi ID: <b>${messageData.userId}</b>
Username: <b>${messageData.username}</b>
Xabar: <b>${messageData.text}</b>
Chat ID: <b>${messageData.chatId}</b>
Vaqt: <b>${messageData.timestamp}</b>
    `;

    try {
      await this.bot.telegram.sendMessage(channelId, formattedMessage, { parse_mode: 'HTML' });
    } catch (err) {
      console.error('Kanalga xabar yuborishda xatolik:', err);
    }
  }
}
