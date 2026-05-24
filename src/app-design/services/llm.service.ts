// src/app-design/services/llm.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmService {
  constructor(private readonly configService: ConfigService) {}

  private getApiKey(): string {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');

    if (!apiKey) {
      throw new InternalServerErrorException('Missing OPENROUTER_API_KEY');
    }

    return apiKey;
  }

  private getModel(): string {
    return this.configService.get<string>('OPENROUTER_MODEL') || 'openai/gpt-4o-mini';
  }

  async generateJson<T>(prompt: string, runId: string): Promise<T> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getApiKey()}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'App Design Orchestrator',
      },
      body: JSON.stringify({
        model: this.getModel(),
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

  async generateStructured<T>(
    prompt: string,
    runId: string,
    jsonSchema: Record<string, any>,
  ): Promise<T> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getApiKey()}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'App Design Orchestrator v2.5',
      },
      body: JSON.stringify({
        model: this.getModel(),
        temperature: 0.2,
        provider: {
          require_parameters: true,
        },
        response_format: {
          type: 'json_schema',
          json_schema: jsonSchema,
        },
        session_id: runId,
        messages: [
          {
            role: 'system',
            content:
              'You are a senior NestJS architect. Return only data that matches the schema exactly.',
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