// src/app-design/steps/analyze-idea.step.ts
import { Injectable } from '@nestjs/common';
import { DesignContext } from '../interfaces/design-context.interface';
import { OrchestratorStep } from '../interfaces/orchestrator-step.interface';
import { StepResult } from '../interfaces/step-result.interface';
import { AppDesignPrompts } from '../prompts/app-design.prompts';
import { LlmService } from '../services/llm.service';
import { retry } from '../utils/retry.util';

@Injectable()
export class AnalyzeIdeaStep implements OrchestratorStep<DesignContext> {
  name = 'analyze-idea';

  constructor(private readonly llmService: LlmService) {}

  async execute(context: DesignContext): Promise<StepResult<DesignContext>> {
    try {
      const result = await retry(
        () =>
          this.llmService.generateJson<DesignContext['analysis']>(
            AppDesignPrompts.analyze(context),
            context.runId,
          ),
        2,
        1000,
      );

      context.analysis = result;
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