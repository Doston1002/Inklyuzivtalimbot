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
exports.BotController = void 0;
const common_1 = require("@nestjs/common");
const bot_service_1 = require("./bot.service");
let BotController = class BotController {
    constructor(botService) {
        this.botService = botService;
    }
    getStatus() {
        return { status: 'Bot ishlayapti' };
    }
    async getMessages() {
        return this.botService.getMessages();
    }
    async sendToChannel(channelId, messageData) {
        if (!channelId) {
            throw new Error('channelId parametri talab qilinadi');
        }
        await this.botService.sendSingleMessageToChannel(channelId, messageData);
        return { message: `Ma'lumotlar ${channelId} kanaliga yuborildi` };
    }
};
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BotController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('messages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BotController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('send-to-channel'),
    __param(0, (0, common_1.Query)('channelId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BotController.prototype, "sendToChannel", null);
BotController = __decorate([
    (0, common_1.Controller)('bot'),
    __metadata("design:paramtypes", [bot_service_1.BotService])
], BotController);
exports.BotController = BotController;
//# sourceMappingURL=bot.controller.js.map