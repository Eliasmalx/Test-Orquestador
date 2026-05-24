// src/app-design/exceptions/orchestrator.exception.ts
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export class OrchestratorStepException extends InternalServerErrorException {
  constructor(
    public readonly step: string,
    message: string,
  ) {
    super({ step, message });
  }
}

export class InvalidLlmResponseException extends BadRequestException {
  constructor(step: string) {
    super({ step, message: 'Invalid LLM response format' });
  }
}