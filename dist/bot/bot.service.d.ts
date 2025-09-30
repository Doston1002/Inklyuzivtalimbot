import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message } from './message.entity';
export declare class BotService implements OnModuleInit {
    private messageModel;
    private bot;
    constructor(messageModel: Model<Message>);
    onModuleInit(): Promise<void>;
    getMessages(): Promise<Message[]>;
    sendSingleMessageToChannel(channelId: string, messageData: any): Promise<void>;
}
