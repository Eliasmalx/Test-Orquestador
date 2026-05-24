// src/app-design/steps/generate-requirements.step.ts
import { Injectable } from '@nestjs/common';
import { DesignContext } from '../interfaces/design-context.interface';
import { OrchestratorStep } from '../interfaces/orchestrator-step.interface';
import { StepResult } from '../interfaces/step-result.interface';
import { AppDesignPrompts } from '../prompts/app-design.prompts';
import { LlmService } from '../services/llm.service';

@Injectable()
export class GenerateRequirementsStep implements OrchestratorStep<DesignContext> {
  name = 'generate-requirements';

  constructor(private readonly llmService: LlmService) {}

  async execute(context: DesignContext): Promise<StepResult<DesignContext>> {
    try {
      const result = await this.llmService.generateJson<DesignContext['requirements']>(
        AppDesignPrompts.requirements(context),
        context.runId,
      );

      context.requirements = result;
      return { ok: true, context };
    } catch (error: any) {
      return {
        ok: false,
        context,
        error: error.message,
        retryable: true,
      };
    }
  }
}