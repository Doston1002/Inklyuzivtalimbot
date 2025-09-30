import { BotService } from './bot.service';
export declare class BotController {
    private readonly botService;
    constructor(botService: BotService);
    getStatus(): {
        status: string;
    };
    getMessages(): Promise<import("./message.entity").Message[]>;
    sendToChannel(channelId: string, messageData: any): Promise<{
        message: string;
    }>;
}
