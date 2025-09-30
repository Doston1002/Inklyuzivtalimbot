"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_entity_1 = require("./message.entity");
let BotService = class BotService {
    constructor(messageModel) {
        this.messageModel = messageModel;
        this.bot = new telegraf_1.Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    }
    async onModuleInit() {
        this.bot.on('message', async (ctx) => {
            var _a, _b, _c;
            if (ctx.message && 'message_id' in ctx.message && 'chat' in ctx.message) {
                const channelId = process.env.TELEGRAM_CHANNEL_ID;
                const newMessage = new this.messageModel({
                    userId: ((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id.toString()) || '',
                    username: ((_b = ctx.message.from) === null || _b === void 0 ? void 0 : _b.username) || ((_c = ctx.message.from) === null || _c === void 0 ? void 0 : _c.first_name) || "Noma'lum",
                    text: 'text' in ctx.message ? ctx.message.text || '' : '',
                    chatId: ctx.message.chat.id.toString(),
                    timestamp: new Date(),
                });
                await newMessage.save();
                try {
                    await ctx.telegram.forwardMessage(channelId, ctx.message.chat.id, ctx.message.message_id);
                }
                catch (err) {
                    console.error('Xabar forward qilishda xatolik:', err);
                }
            }
        });
        this.bot.launch();
        console.log('Telegram bot ishga tushdi');
    }
    async getMessages() {
        return this.messageModel.find().exec();
    }
    async sendSingleMessageToChannel(channelId, messageData) {
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
        }
        catch (err) {
            console.error('Kanalga xabar yuborishda xatolik:', err);
        }
    }
};
BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_entity_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map