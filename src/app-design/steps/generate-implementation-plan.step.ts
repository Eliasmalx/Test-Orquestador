// src/app-design/steps/generate-implementation-plan.step.ts
import { Injectable } from '@nestjs/common';
import { DesignContext } from '../interfaces/design-context.interface';
import { OrchestratorStep } from '../interfaces/orchestrator-step.interface';
import { StepResult } from '../interfaces/step-result.interface';
import { AppDesignPrompts } from '../prompts/app-design.prompts';
import { implementationPlanSchema } from '../schemas/implementation-plan.schema';
import { LlmService } from '../services/llm.service';

@Injectable()
export class GenerateImplementationPlanStep
  implements OrchestratorStep<DesignContext>
{
  name = 'generate-implementation-plan';

  constructor(private readonly llmService: LlmService) {}

  async execute(context: DesignContext): Promise<StepResult<DesignContext>> {
    try {
      const result = await this.llmService.generateStructured<{
        blueprint: DesignContext['blueprint'];
        apiRoutes: DesignContext['apiRoutes'];
        generatedFiles: DesignContext['generatedFiles'];
        nextActions: string[];
      }>(
        AppDesignPrompts.implementationPlan(context),
        context.runId,
        implementationPlanSchema,
      );

      context.blueprint = result.blueprint;
      context.apiRoutes = result.apiRoutes;
      context.generatedFiles = result.generatedFiles;
      context.backlog = (result.nextActions ?? []).map((item, index) => ({
        title: `Next action ${index + 1}`,
        description: item,
        priority: index < 2 ? 'high' : 'medium',
      }));

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