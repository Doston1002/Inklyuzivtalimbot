import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
export declare class BotService implements OnModuleInit {
    private messageRepository;
    private bot;
    constructor(messageRepository: Repository<Message>);
    onModuleInit(): void;
    getMessages(): Promise<Message[]>;
    sendSingleMessageToChannel(channelId: string, messageData: any): Promise<void>;
}
