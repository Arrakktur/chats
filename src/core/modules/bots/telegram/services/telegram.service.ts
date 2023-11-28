import { Injectable, OnModuleInit } from "@nestjs/common";
import { ChatGptService } from "../../../neuralNetworks/chat-gpt/chat-gpt.service";
import { TOKEN_TELEGRAM } from "../../../../models/constants/tokens";

@Injectable()
export class TelegramService implements OnModuleInit {

  constructor(private chatGPTService: ChatGptService) {
  }

  async onModuleInit() {
    await this.botMessage();
  }

  async botMessage() {
    const TelegramBot = require("node-telegram-bot-api");
    const bot = new TelegramBot(TOKEN_TELEGRAM, { polling: true });

    bot.on("message", async (msg) => {
      try {
          console.log('message from telegram', msg.text.toString())
        bot.sendMessage(
          msg.from.id,
          await this.chatGPTService.chat(msg.text.toString())
        );
      } catch (error) {
        console.log('error telegram api', error);
      }
    });
  }
}
