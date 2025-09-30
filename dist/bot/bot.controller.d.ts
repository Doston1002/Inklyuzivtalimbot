import { BotService } from './bot.service';
import { Message } from './message.entity';
export declare class BotController {
    private readonly botService;
    constructor(botService: BotService);
    getStatus(): {
        status: string;
    };
    getMessages(): Promise<Message[]>;
    sendToChannel(channelId: string, messageData: any): Promise<{
        message: string;
    }>;
}
