declare module '@google/genai' {
  export interface ChatChunk {
    text: string;
  }

  export interface Chat {
    sendMessageStream(input: { message: string }): Promise<AsyncIterable<ChatChunk>>;
  }

  export class GoogleGenAI {
    constructor(options: { apiKey: string });
    chats: {
      create(options: {
        model: string;
        config?: {
          systemInstruction?: string;
        };
      }): Chat;
    };
  }
}
