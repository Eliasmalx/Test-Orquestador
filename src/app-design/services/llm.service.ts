// src/app-design/services/llm.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmService {
  constructor(private readonly configService: ConfigService) {}

  async generateJson<T>(prompt: string, runId: string): Promise<T> {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    const model =
      this.configService.get<string>('OPENROUTER_MODEL') || 'openai/gpt-4o-mini';

    if (!apiKey) {
      throw new InternalServerErrorException('Missing OPENROUTER_API_KEY');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'App Design Orchestrator',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        session_id: runId,
        messages: [
          {
            role: 'system',
            content: 'You are a senior product architect. Respond only with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new InternalServerErrorException(
        `OpenRouter error: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new InternalServerErrorException('Empty LLM response');
    }

    return JSON.parse(content) as T;
  }
}