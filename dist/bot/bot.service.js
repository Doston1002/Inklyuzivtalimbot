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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
let BotService = class BotService {
    constructor() {
        this.bot = new telegraf_1.Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    }
    onModuleInit() {
        this.bot.on('message', async (ctx) => {
            if (ctx.message && 'message_id' in ctx.message && 'chat' in ctx.message) {
                const channelId = process.env.TELEGRAM_CHANNEL_ID;
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
};
BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map