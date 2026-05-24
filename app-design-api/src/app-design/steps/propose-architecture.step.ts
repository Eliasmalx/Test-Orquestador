// src/app-design/steps/propose-architecture.step.ts
import { Injectable } from '@nestjs/common';
import { DesignContext } from '../interfaces/design-context.interface';
import { OrchestratorStep } from '../interfaces/orchestrator-step.interface';
import { StepResult } from '../interfaces/step-result.interface';
import { AppDesignPrompts } from '../prompts/app-design.prompts';
import { LlmService } from '../services/llm.service';

@Injectable()
export class ProposeArchitectureStep implements OrchestratorStep<DesignContext> {
  name = 'propose-architecture';

  constructor(private readonly llmService: LlmService) {}

  async execute(context: DesignContext): Promise<StepResult<DesignContext>> {
    try {
      const result = await this.llmService.generateJson<DesignContext['architecture']>(
        AppDesignPrompts.architecture(context),
        context.runId,
      );

      context.architecture = result;
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