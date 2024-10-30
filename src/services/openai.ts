import { Character, GenerateRequest, GenerateResponse } from '../types';
import { config } from '../config/env';

export class OpenAIService {
  private static config = {
    apiKey: localStorage.getItem('openai_api_key') || config.openai.apiKey,
    apiBaseUrl: localStorage.getItem('api_base_url') || config.apiBaseUrl,
    model: localStorage.getItem('openai_model') || config.openai.model,
    imageModel: localStorage.getItem('openai_image_model') || config.openai.imageModel,
  };

  private static get headers() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.apiKey}`,
    };
  }

  static updateConfig(newConfig: typeof OpenAIService.config) {
    this.config = { ...this.config, ...newConfig };
  }

  static async generateStory(characters: { character1: Character; character2: Character }): Promise<string> {
    const prompt = `创作一个关于${characters.character1.name}(${characters.character1.background})和${characters.character2.name}(${characters.character2.background})之间的浪漫故事。故事要富有感情，生动有趣。`;

    const response = await fetch(`${this.config.apiBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          { role: 'system', content: '你是一个专业的言情小说作家，擅长创作浪漫的故事。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || '生成故事失败');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  static async generateImage(prompt: string): Promise<string> {
    const response = await fetch(`${this.config.apiBaseUrl}/images/generations`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        model: this.config.imageModel,
        prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || '生成图片失败');
    }

    const data = await response.json();
    return data.data[0].url;
  }

  static async generate(request: GenerateRequest): Promise<GenerateResponse> {
    const [story, avatar1, avatar2, cpImage] = await Promise.all([
      this.generateStory(request),
      this.generateImage(`头像照片，${request.character1.name}，${request.character1.background}，正面特写`),
      this.generateImage(`头像照片，${request.character2.name}，${request.character2.background}，正面特写`),
      this.generateImage(`浪漫的合照，${request.character1.name}和${request.character2.name}在一起的温馨场景`),
    ]);

    return {
      story,
      avatars: {
        character1: avatar1,
        character2: avatar2,
      },
      cpImage,
    };
  }
}